import React, { useContext, useEffect, useRef } from 'react'
import { SandpackPreview, useSandpack } from "@codesandbox/sandpack-react";
import ActionContext from '@/context/ActionContext';


const SandpackPreviewClient = () => {

    const { sandpack } = useSandpack();
    const previewRef = useRef();
    const { action, setAction } = useContext(ActionContext);

    useEffect(() => {
        getSandpackClient();
    }, [sandpack && action])

    const getSandpackClient = async () => {
        const client = await previewRef.current?.getClient();

        if (client) {
            const result = await client.getCodeSandboxURL();
            console.log(result);

            if (action?.action === "download") {
                window.open(result.editorUrl);
            } else if (action?.action === "deploy") {
                window.open(`https://${result?.sandboxId}.csb.app/`, '_blank', 'noopener');
            }
        }
    }

    return (
        <SandpackPreview ref={previewRef} style={{ height: "80vh" }} showNavigator={true} />
    )

}

export default SandpackPreviewClient