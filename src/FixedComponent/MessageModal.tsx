interface MessageModalProps {
  open: boolean;
  children: React.ReactNode;
}

const MessageModal = ({ open, children }: MessageModalProps) => {
  return (
    <div
      style={{
        ...styles.successModalOverlay,
        display: open ? 'flex' : 'none'
      }}
    >
      <div style={styles.successModal}>
        {children}
      </div>
    </div>
  );
};

export default MessageModal;

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
