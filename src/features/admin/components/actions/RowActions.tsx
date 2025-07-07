import { useState } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ResponsiveModal } from "@/components/responsive-model";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface RowActionsProps {
  id: string;
  name: string; // "Paper" | "Subject" | "Branch"
  EditForm: React.ComponentType<{ id: string; onClose: () => void }>;
  useDelete: () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutate: (args: any, options: { onSuccess: () => void; onError: (error: Error) => void }) => void;
    isPending: boolean;
  };
}

const RowActions = ({ id, name, EditForm, useDelete }: RowActionsProps) => {
  const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

  const { mutate: deleteEntity, isPending } = useDelete();

  const handleDelete = () => {
    deleteEntity(
      { param: { id } },
      {
        onSuccess: () => {
          toast.success(`${name} Deleted`)
          setConfirmOpen(false)
        },
        onError: (error) => toast.error(error.message),
      }
    );
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setOpen(true)}>
            <Pencil className="mr-2 h-4 w-4 text-blue-500" />
            Edit {name}
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setConfirmOpen(true)} disabled={isPending}>
            <Trash2 className="mr-2 h-4 w-4 text-red-500" />
            <span className="text-red-500">Delete {name}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ResponsiveModal open={open} onOpenChange={setOpen} title={name}>
        <EditForm id={id} onClose={() => setOpen(false)} />
      </ResponsiveModal>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogTitle className="text-center">Are you sure you want to delete this {name.toLowerCase()}?</DialogTitle>
          <div className="flex flex-col gap-2 mt-4">
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RowActions