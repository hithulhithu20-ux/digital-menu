import React from "react";
import {
  Clock3,
  ArrowRight,
} from "lucide-react";

const ActivityLog = () => {
  const activities = [
    {
      id: 1,
      name: "Arun",
      action: "Accepted Order #1042",
      table: "Table 12",
      time: "10:32 PM",
      type: "order",
    },
    {
      id: 2,
      name: "David",
      action: "Marked Order #1041 as Ready",
      table: "Table 08",
      time: "10:28 PM",
      type: "ready",
    },
    {
      id: 3,
      name: "Maria",
      action: "Delivered Order #1038",
      table: "Table 08",
      time: "10:15 PM",
      type: "delivered",
    },
    {
      id: 4,
      name: "Arun",
      action: "Accepted Order #1035",
      table: "Table 05",
      time: "09:58 PM",
      type: "order",
    },
    {
      id: 5,
      name: "Rahul",
      action: "Logged in",
      table: "Staff Panel",
      time: "09:42 PM",
      type: "login",
    },
  ];

  const getDotColor = (type) => {
    if (type === "order") {
      return "bg-[#FF7A18]";
    }

    if (type === "ready") {
      return "bg-[#22C55E]";
    }

    if (type === "delivered") {
      return "bg-[#3B82F6]";
    }

    return "bg-[#A855F7]";
  };

  return (
    <div className="overflow-hidden rounded-xl border border-[#252D38] bg-[#111722]">

      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-[#252D38] px-5 py-4">

        <div>
          <h2 className="text-sm font-semibold text-[#F8FAFC]">
            Activity Log
          </h2>

          <p className="mt-1 text-xs text-[#7F8A99]">
            Recent waiter activity
          </p>
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#252D38] bg-[#161D27]">
          <Clock3
            size={16}
            className="text-[#FF7A18]"
          />
        </div>

      </div>

      {/* TIMELINE */}
      <div className="relative px-5 py-5">

        {/* TIMELINE LINE */}
        <div className="absolute bottom-6 left-[31px] top-6 w-px bg-[#252D38]" />

        <div className="space-y-6">

          {activities.map((activity) => (
            <div
              key={activity.id}
              className="relative flex gap-4"
            >

              {/* DOT */}
              <div className="relative z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#111722]">

                <span
                  className={`h-2.5 w-2.5 rounded-full ${getDotColor(
                    activity.type
                  )}`}
                />

              </div>

              {/* ACTIVITY CONTENT */}
              <div className="min-w-0 flex-1">

                <div className="flex items-start justify-between gap-3">

                  <div>

                    {/* WAITER NAME */}
                    <p className="text-xs font-semibold text-[#F8FAFC]">
                      {activity.name}
                    </p>

                    {/* ACTION */}
                    <p className="mt-1 text-xs leading-5 text-[#A1ACBA]">
                      {activity.action}
                    </p>

                    {/* TABLE */}
                    <p className="mt-1 text-[11px] text-[#66717F]">
                      {activity.table}
                    </p>

                  </div>

                  {/* TIME */}
                  <span className="shrink-0 text-[10px] text-[#66717F]">
                    {activity.time}
                  </span>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* FOOTER */}
      <div className="border-t border-[#252D38] px-5 py-3">

        <button
          onClick={() => {
            window.location.href = "/admin/orders";
          }}
          className="group flex items-center gap-1.5 text-xs font-medium text-[#FF7A18] transition hover:text-[#FF9A52]"
        >
          View All Activity

          <ArrowRight
            size={13}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>

      </div>

    </div>
  );
};

export default ActivityLog;