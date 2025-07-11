"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { redirect, usePathname } from "next/navigation";
import { Loader2, LogOut, BookOpen, LayoutDashboard, User, Settings } from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      redirect("/login");
    }
  }, [user, loading]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "Could not log you out. Please try again.",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="/dashboard" isActive={pathname === '/dashboard'} tooltip="Dashboard">
                <LayoutDashboard />
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/dashboard" isActive={pathname.startsWith('/dashboard/modules')} tooltip="Modules">
                <BookOpen />
                Modules
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="flex-col !items-start gap-4">
          <div className="flex w-full items-center justify-between rounded-lg p-2 hover:bg-sidebar-accent">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.photoURL || `https://placehold.co/40x40.png`} data-ai-hint="user avatar" />
                <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="truncate text-sm font-medium">{user.email}</span>
            </div>
            <SidebarMenuButton onClick={handleLogout} variant="ghost" size="icon" className="h-8 w-8 shrink-0">
              <LogOut size={16} />
            </SidebarMenuButton>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur-sm md:px-6">
            <div className="md:hidden">
              <SidebarTrigger />
            </div>
            <div className="flex-1">
              {/* Maybe a search bar or breadcrumbs in the future */}
            </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

// A stub for useRouter to avoid breaking server rendering where it's not actually used
// but is required by the handleLogout function.
// In a real app, you might structure this differently if this layout were a Server Component.
// But since it's a client component due to auth checks, this is fine.
const { useRouter } = require("next/navigation");
