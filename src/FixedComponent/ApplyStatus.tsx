// Props for ApplyStatus component
interface ApplyStatusProps {
  status: string; // The current application status
}

// Mapping of internal status codes to display labels
const statusObj: Record<string, string> = {
  processing: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected'
};

/**
 * ApplyStatus component for TeachTeam.
 * 
 * - Displays the current application status as a styled badge.
 * - Changes background color based on the status:
 *   - Green for Approved
 *   - Red for Rejected
 *   - Blue for Pending (Processing)
 * - Status label text is mapped from internal status values.
 */

const ApplyStatus = ({ status = 'processing' }: ApplyStatusProps) => {
  return (
    <div
      style={{
        ...styles.baseStyle,
        backgroundColor: status === 'approved' ? '#16a34a' : status === 'rejected' ? '#dc2626' : '#085DB7'
      }}
    >
      {statusObj[status]} {/* Display user-friendly status label */}
    </div>
  );
};

export default ApplyStatus;

// Styling for the ApplyStatus badge
const styles: { [key: string]: React.CSSProperties } = {
  baseStyle: {
    color: '#fff',
    padding: '6px 16px',
    borderRadius: '9px',
    fontWeight: 600
  }
};
