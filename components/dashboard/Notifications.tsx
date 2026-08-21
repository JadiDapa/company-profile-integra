"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { Bell } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  getMyNotifications,
  getMyUnreadNotificationCount,
  markAllNotificationsRead,
  markNotificationRead,
} from "@/app/actions/notification.action";
import { Notification } from "@/generated/prisma";
import { formatDistanceToNow } from "date-fns";

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isPending, startTransition] = useTransition();

  const load = useCallback(async () => {
    const [list, count] = await Promise.all([
      getMyNotifications(),
      getMyUnreadNotificationCount(),
    ]);
    setNotifications(list);
    setUnreadCount(count);
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, [load]);

  function handleMarkAll() {
    startTransition(async () => {
      await markAllNotificationsRead();
      await load();
    });
  }

  function handleClickNotification(id: number) {
    startTransition(async () => {
      await markNotificationRead(id);
      await load();
    });
  }

  return (
    <Popover onOpenChange={(open) => open && load()}>
      <PopoverTrigger className="relative">
        <Bell strokeWidth={1.8} size={24} />
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 grid size-4 place-items-center rounded-full bg-red-500">
            <p className="text-xs text-white">{unreadCount}</p>
          </div>
        )}
      </PopoverTrigger>

      <PopoverContent align="end" className="w-96 p-0">
        <div className="relative flex items-center justify-between border-b px-6 py-4">
          <p>Notifications</p>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAll}
              disabled={isPending}
              className="text-primary text-sm font-medium"
            >
              Mark all read
            </button>
          )}
        </div>

        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="text-muted-foreground p-6 text-center text-sm">
              No notifications yet
            </p>
          ) : (
            notifications.map((n) => (
              <button
                key={n.id}
                onClick={() => handleClickNotification(n.id)}
                className={`flex w-full flex-col items-start gap-1 border-b p-4 text-left transition hover:bg-slate-100 ${
                  n.read ? "" : "bg-primary/5"
                }`}
              >
                <p className="text-sm font-medium">{n.title}</p>
                <p className="text-muted-foreground text-sm">{n.message}</p>
                <p className="text-muted-foreground text-xs">
                  {formatDistanceToNow(new Date(n.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </button>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
