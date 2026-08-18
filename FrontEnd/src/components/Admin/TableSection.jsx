import React, { useState } from 'react';
import { Card } from './TablesCard';
import { QRCodeCard } from './QRCodeCard';
import { AddTableForm } from './AddTableForm';
import { FilterList } from './FilterList';
import { tablesMockData, areasList, getStatCardsData } from '../../MockData/mockData';

export const TableSection = () => {
    const [tablesList, setTablesList] = useState(tablesMockData);
    const [selectedArea, setSelectedArea] = useState('All Areas');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [selectedTable, setSelectedTable] = useState(null);

    // Controls for modular components
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Dynamic statistics calculation
    const totalTables = tablesList.length;
    const availableTables = tablesList.filter(t => t.status === 'Available').length;
    const occupiedTables = tablesList.filter(t => t.status === 'Occupied').length;
    const billRequestedTables = tablesList.filter(t => t.status === 'Bill Req.').length;

    // Stat Cards configuration retrieved from mockData helper
    const statCardsData = getStatCardsData({
        totalTables,
        availableTables,
        occupiedTables,
        billRequestedTables
    });

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);

    // Filter logic
    const filteredTables = tablesList.filter((table) => {
        const areaMatch = selectedArea === 'All Areas' || table.area === selectedArea;
        const statusMatch = selectedStatus === 'All' || table.status === selectedStatus;
        return areaMatch && statusMatch;
    });

    const totalPages = Math.ceil(filteredTables.length / itemsPerPage) || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedTables = filteredTables.slice(startIndex, startIndex + itemsPerPage);

    const handleAreaChange = (area) => {
        setSelectedArea(area);
        setCurrentPage(1);
    };

    const handleStatusChange = (status) => {
        setSelectedStatus(status);
        setCurrentPage(1);
    };

    const handleAddTable = (newTable) => {
        setTablesList([newTable, ...tablesList]);
    };

    const handleResetFilters = () => {
        setSelectedStatus('All');
        setCurrentPage(1);
    };

    return (
        <div className="w-full text-[#E2E2E9] font-['Inter',sans-serif] p-4 sm:p-6 lg:p-8 ">
            <div className="w-full space-y-8">

                {/* TOP HEADER SECTION */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-1">
                        <h1
                            style={{
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 700,
                                fontSize: '32px',
                                lineHeight: '40px',
                                letterSpacing: '-0.64px',
                                color: '#E2E2E9'
                            }}
                        >
                            Tables &amp; QR Codes
                        </h1>
                        <p
                            style={{
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 400,
                                fontSize: '16px',
                                lineHeight: '26px',
                                letterSpacing: '0px',
                                color: '#8A929B'
                            }}
                        >
                            Manage dining areas, track occupancy, and generate QR menus.
                        </p>
                    </div>

                    <button
                        onClick={() => setIsAddFormOpen(true)}
                        style={{
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 500,
                            fontSize: '16px',
                            lineHeight: '24px',
                            letterSpacing: '0px',
                            color: '#FFFFFF'
                        }}
                        className="bg-[#FF6200] hover:bg-[#E05600] active:scale-[0.98] transition-all px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-[#FF6200]/20 cursor-pointer self-start sm:self-auto min-w-[140px]"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        <span>Add Table</span>
                    </button>
                </div>

                {/* TOP STAT CARDS GRID - 3 COLUMNS WITH INCREASED HEIGHT */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {statCardsData.map((card) => {
                        const isActiveFilter = selectedStatus === card.statusFilter;

                        return (
                            <div
                                key={card.id}
                                onClick={() => setSelectedStatus(card.statusFilter)}
                                className={`bg-[#131822] border border-[#1F2736] ${card.borderClass} ${card.hoverClass} transition-all duration-300 rounded-2xl p-6 sm:p-7 min-h-[145px] sm:min-h-[165px] flex flex-col justify-between shadow-md ${isActiveFilter ? 'ring-2 ring-[#FF6200] scale-[1.01]' : ''
                                    }`}
                            >
                                <div className="flex items-center gap-2.5">
                                    {card.dotColor && (
                                        <span className={`w-2.5 h-2.5 rounded-full ${card.dotColor} shrink-0 inline-block`} />
                                    )}
                                    <span
                                        style={{
                                            fontFamily: 'Inter, sans-serif',
                                            fontWeight: 600,
                                            fontSize: '13px',
                                            lineHeight: '18px',
                                            letterSpacing: '0.8px',
                                            textTransform: 'uppercase',
                                            color: '#8A929B'
                                        }}
                                    >
                                        {card.label}
                                    </span>
                                </div>
                                <div className={`font-['Inter'] font-bold text-[38px] sm:text-[44px] leading-[48px] ${card.textColor} mt-4`}>
                                    {card.value}
                                </div>
                            </div>
                        );
                    })}
                </div>
                {/* AREA FILTER TABS ROW & FILTER BUTTON */}
                <div className="flex items-center justify-between border-b border-[#1F2736] pb-3 pt-4 relative">
                    {/* Area Navigation Tabs */}
                    <div className="flex items-center gap-8 overflow-x-auto scrollbar-none">
                        {areasList.map((area) => (
                            <button
                                key={area}
                                onClick={() => handleAreaChange(area)}
                                className={`relative pb-3 text-base font-semibold transition-colors cursor-pointer whitespace-nowrap ${selectedArea === area
                                    ? 'text-white'
                                    : 'text-[#8A929B] hover:text-[#E2E2E9]'
                                    }`}
                            >
                                {area}
                                {selectedArea === area && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6200] rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Filter Button Container with Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-3.5 py-2 rounded-lg border transition-all cursor-pointer ${isFilterOpen || selectedStatus !== 'All'
                                ? 'border-[#FF6200] bg-[#FF6200]/15 text-white'
                                : 'text-[#8A929B] hover:text-white border-[#1F2736] hover:border-[#2E3A50] bg-[#121722]'
                                }`}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                            </svg>
                            <span>FILTER</span>
                            {selectedStatus !== 'All' && (
                                <span className="w-2 h-2 rounded-full bg-[#FF6200]" />
                            )}
                        </button>

                        {/* SEPARATE FILTER LIST COMPONENT */}
                        <FilterList
                            isOpen={isFilterOpen}
                            onClose={() => setIsFilterOpen(false)}
                            selectedStatus={selectedStatus}
                            onSelectStatus={handleStatusChange}
                            onReset={handleResetFilters}
                        />
                    </div>
                </div>

                {/* TABLE CARDS GRID (Mobile: 1 col, Tab: 2 cols, Desktop: 4 cols) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {paginatedTables.map((table) => (
                        <Card
                            key={table.id}
                            table={table}
                            onSelect={(tbl) => setSelectedTable(tbl)}
                        />
                    ))}
                </div>

                {/* PAGINATION CONTROLS BAR */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#1F2736] text-xs font-semibold text-[#8A929B]">
                    {/* Items Counter & Per Page Dropdown */}
                    <div className="flex items-center gap-4">
                        <span>
                            Showing <strong className="text-white">{filteredTables.length > 0 ? startIndex + 1 : 0}</strong> to{' '}
                            <strong className="text-white">{Math.min(startIndex + itemsPerPage, filteredTables.length)}</strong> of{' '}
                            <strong className="text-white">{filteredTables.length}</strong> tables
                        </span>

                        <div className="flex items-center gap-2 bg-[#131822] border border-[#1F2736] rounded-lg px-2.5 py-1 text-white">
                            <span>Per page:</span>
                            <select
                                value={itemsPerPage}
                                onChange={(e) => {
                                    setItemsPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                                className="bg-transparent text-white outline-none cursor-pointer"
                            >
                                <option value={8} className="bg-[#131822] text-white">8</option>
                                <option value={12} className="bg-[#131822] text-white">12</option>
                                <option value={16} className="bg-[#131822] text-white">16</option>
                            </select>
                        </div>
                    </div>

                    {/* Pagination Navigation Buttons */}
                    <div className="flex items-center gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            className={`px-3.5 py-2 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${currentPage === 1
                                ? 'border-[#1F2736] text-[#404957] cursor-not-allowed bg-[#131822]/50'
                                : 'border-[#1F2736] text-white hover:border-[#FF6200] hover:bg-[#FF6200]/15'
                                }`}
                        >
                            <span>←</span>
                            <span>Prev</span>
                        </button>

                        <div className="flex items-center gap-1.5">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNo) => (
                                <button
                                    key={pageNo}
                                    onClick={() => setCurrentPage(pageNo)}
                                    className={`w-9 h-9 rounded-lg font-bold text-xs transition-all cursor-pointer ${currentPage === pageNo
                                        ? 'bg-[#FF6200] text-white shadow-md shadow-[#FF6200]/30'
                                        : 'bg-[#131822] border border-[#1F2736] text-[#8A929B] hover:text-white hover:border-[#2E3A50]'
                                        }`}
                                >
                                    {pageNo}
                                </button>
                            ))}
                        </div>

                        <button
                            disabled={currentPage === totalPages || totalPages === 0}
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            className={`px-3.5 py-2 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${currentPage === totalPages || totalPages === 0
                                ? 'border-[#1F2736] text-[#404957] cursor-not-allowed bg-[#131822]/50'
                                : 'border-[#1F2736] text-white hover:border-[#FF6200] hover:bg-[#FF6200]/15'
                                }`}
                        >
                            <span>Next</span>
                            <span>→</span>
                        </button>
                    </div>
                </div>

                {/* REUSABLE SEPARATE ADD TABLE FORM COMPONENT */}
                <AddTableForm
                    isOpen={isAddFormOpen}
                    onClose={() => setIsAddFormOpen(false)}
                    onAddTable={handleAddTable}
                />

                {/* REUSABLE SEPARATE QR CODE COMPONENT */}
                <QRCodeCard
                    table={selectedTable}
                    onClose={() => setSelectedTable(null)}
                    onOpenOrderForm={(tblNo) => {
                        setSelectedTable(null);
                        if (onOpenOrderForm) onOpenOrderForm(tblNo);
                    }}
                />

            </div>
        </div>
    );
};