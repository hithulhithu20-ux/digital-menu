export const initialStats = {
  totalTables: 24,
  availableTables: 16,
  occupiedTables: 6,
  billRequestedTables: 2,
};

export const getStatCardsData = (counts) => [
  {
    id: 'total',
    label: 'TOTAL TABLES',
    value: counts?.totalTables ?? 0,
    borderClass: '',
    hoverClass: 'hover:border-[#3B4E6B] hover:shadow-xl hover:shadow-white/5 hover:-translate-y-1 hover:bg-[#161D2B] cursor-pointer',
    dotColor: null,
    textColor: 'text-[#FFFFFF]',
    statusFilter: 'All'
  },
  {
    id: 'available',
    label: 'AVAILABLE',
    value: counts?.availableTables ?? 0,
    borderClass: 'border-l-4 border-l-[#10B981]',
    hoverClass: 'hover:border-l-[#10B981] hover:border-[#10B981]/50 hover:shadow-xl hover:shadow-[#10B981]/20 hover:-translate-y-1 hover:bg-[#141F2B] cursor-pointer',
    dotColor: 'bg-[#10B981]',
    textColor: 'text-[#10B981]',
    statusFilter: 'Available'
  },
  {
    id: 'occupied',
    label: 'OCCUPIED',
    value: counts?.occupiedTables ?? 0,
    borderClass: 'border-l-4 border-l-[#F59E0B]',
    hoverClass: 'hover:border-l-[#F59E0B] hover:border-[#F59E0B]/50 hover:shadow-xl hover:shadow-[#F59E0B]/20 hover:-translate-y-1 hover:bg-[#1C1A14] cursor-pointer',
    dotColor: 'bg-[#F59E0B]',
    textColor: 'text-[#F59E0B]',
    statusFilter: 'Occupied'
  }
];

export const tablesMockData = [
  {
    id: 1,
    tableNo: "T-12",
    status: "Available",
    seats: 4,
    area: "Indoor",
    lastScan: "2h ago",
    currentOrder: null,
    hasNotification: false,
    qrCode: "TBL-012"
  },
  {
    id: 2,
    tableNo: "T-14",
    status: "Occupied",
    seats: 2,
    area: "Indoor",
    lastScan: "15m ago",
    currentOrder: "$145.00",
    hasNotification: true,
    qrCode: "TBL-014"
  },
  {
    id: 3,
    tableNo: "TR-05",
    status: "Bill Req.",
    seats: 6,
    area: "Terrace",
    lastScan: "5m ago",
    currentOrder: "$312.50",
    waiterAlerted: true,
    hasNotification: false,
    qrCode: "TR-005"
  },
  {
    id: 4,
    tableNo: "T-15",
    status: "Available",
    seats: 2,
    area: "Indoor",
    lastScan: "4h ago",
    currentOrder: null,
    hasNotification: false,
    qrCode: "TBL-015"
  },
  {
    id: 5,
    tableNo: "T-01",
    status: "Available",
    seats: 4,
    area: "Indoor",
    lastScan: "30m ago",
    currentOrder: null,
    hasNotification: false,
    qrCode: "TBL-001"
  },
  {
    id: 6,
    tableNo: "TR-02",
    status: "Occupied",
    seats: 4,
    area: "Terrace",
    lastScan: "10m ago",
    currentOrder: "$84.50",
    hasNotification: false,
    qrCode: "TR-002"
  },
  {
    id: 7,
    tableNo: "TR-03",
    status: "Bill Req.",
    seats: 4,
    area: "Terrace",
    lastScan: "2m ago",
    currentOrder: "$165.00",
    waiterAlerted: true,
    hasNotification: false,
    qrCode: "TR-003"
  },
  {
    id: 8,
    tableNo: "T-08",
    status: "Occupied",
    seats: 8,
    area: "Indoor",
    lastScan: "45m ago",
    currentOrder: "$220.00",
    hasNotification: true,
    qrCode: "TBL-008"
  }
];

export const areasList = ["All Areas", "Indoor", "Terrace"];
