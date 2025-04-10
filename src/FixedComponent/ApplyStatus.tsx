interface ApplyStatusProps {
  status: string;
}

const statusObj: Record<string, string> = {
  processing: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected'
};

const ApplyStatus = ({ status = 'processing' }: ApplyStatusProps) => {
  return (
    <div
      style={{
        ...styles.baseStyle,
        backgroundColor: status === 'approved' ? '#16a34a' : status === 'rejected' ? '#dc2626' : '#085DB7'
      }}
    >
      {statusObj[status]}
    </div>
  );
};

export default ApplyStatus;

const styles: { [key: string]: React.CSSProperties } = {
  baseStyle: {
    color: '#fff',
    padding: '6px 16px',
    borderRadius: '9px',
    fontWeight: 600
  }
};
