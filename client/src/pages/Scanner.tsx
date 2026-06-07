import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";
import { verifyTicket } from "../api/scannerApi";

const Scanner = () => {
    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "reader", {
            fps: 10,
            qrbox: 500,
        }, false
        );
        let isCleared = false;
        scanner.render(
            async (decodedText) => {
                try {
                    if (!isCleared) {
                        isCleared = true;
                        await scanner.clear();
                    }
                    const qrData = JSON.parse(decodedText);
                    console.log("QR Data:", qrData);
                    console.log("ticketCode:", qrData.ticketCode);
                    const result = await verifyTicket(qrData.ticketCode);
                    alert(result.message);
                } catch (error: any) {
                    alert(error.response?.data?.message || "Verification failed");
                    console.log(error.response?.data);
                }
            },
            () => { }
        );

        return () => {
            if (!isCleared) {
                scanner.clear().catch(console.error);
            }
        };
    }, []);
    return (
        <div>
            <div id="reader" />
        </div>
    );
};

export default Scanner;