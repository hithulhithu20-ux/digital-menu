import React, { useState } from 'react';
import { Card } from './TablesCard';
import { QRCodeCard } from './QRCodeCard';
import { AddTableForm } from './AddTableForm';
import { FilterList } from './FilterList';
import { tablesMockData, areasList, getStatCardsData } from './mockData';

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

    // Filter logic
    const filteredTables = tablesList.filter((table) => {
        const areaMatch = selectedArea === 'All Areas' || table.area === selectedArea;
        const statusMatch = selectedStatus === 'All' || table.status === selectedStatus;
        return areaMatch && statusMatch;
    });

    const handleAddTable = (newTable) => {
        setTablesList([newTable, ...tablesList]);
    };

    const handleResetFilters = () => {
        setSelectedStatus('All');
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

                {/* TOP STAT CARDS GRID - RENDERED FROM EXTERNAL MOCK DATA */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {statCardsData.map((card) => (
                        <div
                            key={card.id}
                            className={`bg-[#131822] border border-[#1F2736] ${card.borderClass} rounded-xl p-5 flex flex-col justify-between hover:border-[#2D384D] transition-colors shadow-sm`}
                        >
                            <div className="flex items-center gap-2">
                                {card.dotColor && (
                                    <span className={`w-2 h-2 rounded-full ${card.dotColor} shrink-0 inline-block`} />
                                )}
                                <span
                                    style={{
                                        fontFamily: 'Inter, sans-serif',
                                        fontWeight: 500,
                                        fontSize: '12px',
                                        lineHeight: '16px',
                                        letterSpacing: '0.6px',
                                        textTransform: 'uppercase',
                                        color: '#8A929B'
                                    }}
                                >
                                    {card.label}
                                </span>
                            </div>
                            <div className={`font-['Inter'] font-bold text-[32px] sm:text-[36px] leading-[44px] ${card.textColor} mt-3`}>
                                {card.value}
                            </div>
                        </div>
                    ))}
                </div>

                {/* AREA FILTER TABS ROW & FILTER BUTTON */}
                <div className="flex items-center justify-between border-b border-[#1F2736] pb-3 pt-4 relative">
                    {/* Area Navigation Tabs */}
                    <div className="flex items-center gap-8 overflow-x-auto scrollbar-none">
                        {areasList.map((area) => (
                            <button
                                key={area}
                                onClick={() => setSelectedArea(area)}
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
                            onSelectStatus={setSelectedStatus}
                            onReset={handleResetFilters}
                        />
                    </div>
                </div>

                {/* TABLE CARDS GRID (Mobile: 1 col, Tab: 2 cols, Desktop: 4 cols) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {filteredTables.map((table) => (
                        <Card
                            key={table.id}
                            table={table}
                            onSelect={(tbl) => setSelectedTable(tbl)}
                        />
                    ))}
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
                />

            </div>
        </div>
    );
};