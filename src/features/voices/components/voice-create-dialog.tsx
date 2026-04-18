"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { VoiceCreateForm } from "./voice-create-form";
import { Button } from "@/components/ui/button";

import { useCallback } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

interface VoiceCreateDialogProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function VoiceCreateDialog({
  children,
  open,
  onOpenChange,
}: VoiceCreateDialogProps) {
  const t = useTranslations("VoiceCreate");

  const isMobile = useIsMobile();

  const handleError = useCallback((message: string) => {
    if (message === "SUBSCRIPTION_REQUIRED") {
      toast.error("Subscription required", {
        action: {
          label: "Subscribe",
          onClick: () => {},
        },
      });
    } else {
      toast.error(message);
    }
  }, []);

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        {children && <DrawerTrigger asChild>{children}</DrawerTrigger>}
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t("title")}</DrawerTitle>
            <DrawerDescription>{t("des")}</DrawerDescription>
          </DrawerHeader>
          <VoiceCreateForm
            scrollable
            onError={handleError}
            footer={(submit) => (
              <DrawerFooter>
                {submit}
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            )}
          />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent>
        <DialogHeader className="text-left">
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("des")}</DialogDescription>
        </DialogHeader>
        <VoiceCreateForm onError={handleError} />
      </DialogContent>
    </Dialog>
  );
}
