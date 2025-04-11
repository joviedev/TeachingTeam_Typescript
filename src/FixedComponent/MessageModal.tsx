// Props for MessageModal
interface MessageModalProps {
  open: boolean;               // Whether the modal is visible or not
  children: React.ReactNode;    // Content to display inside the modal
}

/**
 * MessageModal component for TeachTeam.
 * 
 * - Displays a centered modal overlay with a message or custom content.
 * - Shows or hides the modal based on the `open` prop.
 * - Useful for showing success messages, alerts, or small notifications.
 */

const MessageModal = ({ open, children }: MessageModalProps) => {
  return (
    // Modal overlay container
    <div
      style={{
        ...styles.successModalOverlay,  // Base overlay styles (fixed position, semi-transparent background)
        display: open ? 'flex' : 'none'  // Show modal only if `open` is true, otherwise hide
      }}
    >
      <div style={styles.successModal}>
        {children}
      </div>
    </div>
  );
};

export default MessageModal;

// Styling for MesageModal
const styles: { [key: string]: React.CSSProperties } = {
  successModalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  successModal: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
    padding: '20px 30px',
    borderRadius: '12px',
    fontWeight: 600,
    fontSize: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    textAlign: 'center',
  },
};
