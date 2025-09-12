import { Play } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";

import VideoPlayer from "~/components/VideoPlayer";

export function WatchPreview() {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <a
                        href="#"
                        className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-6 py-3 hover:bg-white/10"
                    >
                        <Play className="h-5 w-5" /> Watch Preview
                    </a>
                </DialogTrigger>
                <DialogContent className="bg-white sm:max-w-[1000px]">
                    <DialogHeader>
                        <DialogTitle>University Event Video Preview</DialogTitle>
                        <DialogDescription>
                            Experience the highlights from our annual Tech Innovation Summit, where students and faculty showcase groundbreaking projects, network with industry leaders, and celebrate the spirit of discovery. Watch the preview to catch the excitement!
                        </DialogDescription>
                    </DialogHeader>
                    <VideoPlayer src={"/video/event.mp4"} />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
