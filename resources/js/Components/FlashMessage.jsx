import { useEffect, useRef } from "react";
import { usePage } from "@inertiajs/react";
import { toast } from "react-hot-toast";

export default function FlashMessage() {
    // Ambil terus dari root props mengikut HandleInertiaRequests anda
    const { success, error } = usePage().props;

    const prevSuccess = useRef(null);
    const prevError = useRef(null);

    useEffect(() => {
        // Logik untuk Mesej Sukses
        if (success && success !== prevSuccess.current) {
            const [msg] = success.split("#"); // Buang bahagian UUID belakang
            toast.success(msg.trim(), {
                duration: 4000,
            });
            prevSuccess.current = success; // Simpan nilai penuh termasuk UUID baru
        }

        // Logik untuk Mesej Ralat
        if (error && error !== prevError.current) {
            const [msg] = error.split("#"); // Buang bahagian UUID belakang
            toast.error(msg.trim(), {
                duration: 4000,
            });
            prevError.current = error; // PENGESAHAN: Simpan nilai ralat penuh
            // KOD YANG DIPADAM: prevSuccess.current = success; <-- BUG LAMA SUDAH DIBUANG DISINI!
        }
    }, [success, error]);

    return null;
}
