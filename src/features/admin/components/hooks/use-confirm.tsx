import { Button, ButtonProps } from "@/components/ui/button";
import { useState } from "react";
import ResponsiveModal  from "@/components/ResponsiveModel";

import {
    Card,
    CardContent,
    CardTitle,
    CardDescription,
    CardHeader,
} from "@/components/ui/card";

interface UseConfirmProps {
  title: string;
  message: string;
  variant: ButtonProps["variant"];
}

export const useConfirm = ({
  title,
  message,
  variant = "default",
}: UseConfirmProps): [() => React.ReactElement, () => Promise<unknown>] => {
  const [promis, setPromis] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirmDelete = async () => {
    return new Promise((resolve) => {
      setPromis({ resolve });
    });
  };

  const handleClose = () => {
    setPromis(null);
  };

  const handleConfirm = () => {
    promis?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promis?.resolve(false);
    handleClose();
  };

  const ConfirmationDialog = () => {
    return (
      <ResponsiveModal open={promis !== null} onOpenChange={handleClose}>
        <Card>
          <CardContent>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{message}</CardDescription>
            </CardHeader>
            <div className="py-1 flex flex-col lg:flex-row gap-2  items-center justify-between">
              <Button
                onClick={handleCancel}
                variant={"outline"}
                className="w-full lg:w-auto">
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                variant={variant}
                className="w-full lg:w-auto">
                Confirm
              </Button>
            </div>
          </CardContent>
        </Card>
      </ResponsiveModal>
    );
  };

  return [ConfirmationDialog, confirmDelete];
};
