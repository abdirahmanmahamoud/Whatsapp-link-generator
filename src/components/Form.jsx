import { useState, useEffect } from 'react';
import { RiWhatsappFill, RiFileCopyLine } from "react-icons/ri";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Form(){

    const [linkData, setLinkData] = useState({
        phone: "",
        message: ""
    });

    const [whatasappApi, setWhatsappApi] = useState("");
    const [resultLink, setResultLink] = useState({
        value: "",
        copied: false
    });

    const [copyText, setCopyText] = useState("Copy To clipboard");
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!linkData.phone || !linkData.message) {
            toast.error("please fill the form");
            return;
        } else {
            setResultLink({ ...resultLink, value: whatasappApi });
        }
    };

    const whatsPhone = (event) => {
        setLinkData({ ...linkData, [event.target.name]: event.target.value });    
    };

    useEffect(() => {
        setWhatsappApi(`https://api.whatsapp.com/send?phone=${linkData.phone}&text=${linkData.message}`);
    }, [linkData]);
  return (
    <div className='container'>
        <form onSubmit={handleSubmit}>
            <header>
                <h1>Whatsapp link generator</h1>
                <RiWhatsappFill className='whatsapp-icon'/>
            </header>
            <div className="row">
                <label>Enter your whatsapp number</label>
                <input type='text' name='phone' placeholder='Enter your whatsapp number'className='form-control' onChange={whatsPhone}/>
            </div>
            <div className="row">
                <label>Enter your message</label>
                <textarea name="message" id="" cols="3" rows="80" placeholder='Enter your message' className='form-control' onChange={whatsPhone} />
            </div>
            <button className='btn'>Generator link</button>
            <div className="result-area">
                    <input type="text" readOnly className="form-result"
                        value={resultLink.value}
                    />

                    <CopyToClipboard
                        text={resultLink.value}
                        onCopy={() => {
                            setResultLink({ ...resultLink, copied: true });
                            setCopyText("Copied");
                            toast.success("Copied To Clipboard");
                        }}
                    >
                        <div className="result-text">
                            <span>{copyText}</span>
                            <RiFileCopyLine className="copy-icon" />
                        </div>
                    </CopyToClipboard>
                </div>
            </form>
            <ToastContainer position="top-right" />
        </div>
  )
}

export default Form