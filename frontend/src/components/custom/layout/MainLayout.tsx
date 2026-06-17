import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Bot } from "lucide-react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={sidebarOpen} />
      </div>

      {/* Content */}
      <div className="flex flex-1 pt-16 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ease-in-out h-full flex-shrink-0 ${
            sidebarOpen ? "lg:w-48" : "lg:w-16"
          }`}
        >
          <Sidebar isOpen={sidebarOpen} />
        </div>

        {/* Main */}
        <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden p-4">
          <Outlet />

          <div className="absolute lg:right-8 right-6 bottom-10 lg:bottom-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  style={{ borderRadius: "100%" }}
                  className="p-2 w-12 h-12"
                >
                  <Bot className="w-10 h-10" />
                </Button>
              </DialogTrigger>

              <DialogContent
                style={{ borderRadius: "0.5rem" }}
                className="min-w-[300px] min-h-[400px]"
              >
                <iframe
                  src="https://www.chatbase.co/chatbot-iframe/PTRlFYjs_q3zqoB5axyGP"
                  width="100%"
                  height="400px"
                />
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
