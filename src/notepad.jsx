/* eslint-disable no-unused-vars */
import ReactDOMServer from "react-dom/server";

const Notepad = () => {
    return (
        <>
            <div className="np-header">
                <a onClick={(e) => {
                    e.preventDefault();
                    // proof of concept
                    // document.body.innerHTML = document.getElementById('np-edit').innerHTML;
                    // document.getElementById('render').srcdoc = toString(document.getElementById('np-edit').innerHTML);
                }}>Run</a>
            </div>
            <div contentEditable onKeyDown={(e) => {
                if(e.key=="Tab"){
                    e.preventDefault();
                    var editor = e.target;
                    var doc = editor.ownerDocument.defaultView;
                    var sel = doc.getSelection();
                    var range = sel.getRangeAt(0);
                    var tabNode = document.createTextNode("\u00a0\u00a0\u00a0\u00a0");
                    range.insertNode(tabNode);
                    range.setStartAfter(tabNode);
                    range.setEndAfter(tabNode); 
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
                if (e.keyCode === 13) {
                    // insert 2 br tags (if only one br tag is inserted the cursor won't go to the next line)
                    document.execCommand('insertHTML', false, '<br/>');
                    // prevent the default behaviour of return key pressed
                    return false;
                }
            }} className='np-edit' id="np-edit">
            </div>
        </>
    )
}
export default Notepad;