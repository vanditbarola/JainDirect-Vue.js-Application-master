import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

export function initializeQuillEditors(editorNewsRef1, editorNewsRef2 , editorEventRef1 , editorEventRef2 , editorVideoRef1 , editorVideoRef2 , editorAppealRef1 ,editorAppealRef2 , editorNewsCreateRef1, editorEventCreateRef1 , editorAppealCreateRef1 , editorVideoCreateRef1) {
    const quill1 = new Quill(editorNewsRef1, {
        modules: {
            toolbar: [
                [{ 'font': [] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                ['blockquote', 'code-block'],
                ["image", "link", "video"]
            ]
        },
        placeholder: 'Enter Description',
        theme: 'snow'
    });

    const quill2 = new Quill(editorNewsRef2, {
        modules: {
            toolbar: [
                [{ 'font': [] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                ['blockquote', 'code-block'],
                ["image", "link", "video"]
            ]
        },
        placeholder: 'Enter Description',
        theme: 'snow'
    });
    const quill3 = new Quill(editorEventRef1, {
        modules: {
            toolbar: [
                [{ 'font': [] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                ['blockquote', 'code-block'],
                ["image", "link", "video"]
            ]
        },
        placeholder: 'Enter Description',
        theme: 'snow'
    });

    const quill4 = new Quill(editorEventRef2, {
        modules: {
            toolbar: [
                [{ 'font': [] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                ['blockquote', 'code-block'],
                ["image", "link", "video"]
            ]
        },
        placeholder: 'Enter Description',
        theme: 'snow'
    });
    const quill5 = new Quill(editorVideoRef1, {
        modules: {
            toolbar: [
                [{ 'font': [] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                ['blockquote', 'code-block'],
                ["image", "link", "video"]
            ]
        },
        placeholder: 'Enter Description',
        theme: 'snow'
    });
    const quill6 = new Quill(editorVideoRef2, {
        modules: {
            toolbar: [
                [{ 'font': [] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                ['blockquote', 'code-block'],
                ["image", "link", "video"]
            ]
        },
        placeholder: 'Enter Description',
        theme: 'snow'
    });
    const quill7 = new Quill(editorAppealRef1, {
        modules: {
            toolbar: [
                [{ 'font': [] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                ['blockquote', 'code-block'],
                ["image", "link", "video"]
            ]
        },
        placeholder: 'Enter Description',
        theme: 'snow'
    });
    const quill8 = new Quill(editorAppealRef2, {
        modules: {
            toolbar: [
                [{ 'font': [] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                ['blockquote', 'code-block'],
                ["image", "link", "video"]
            ]
        },
        placeholder: 'Enter Description',
        theme: 'snow'
    });
    const quill9 = new Quill(editorNewsCreateRef1, {
        modules: {
            toolbar: [
                [{ 'font': [] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                ['blockquote', 'code-block'],
                ["image", "link", "video"]
            ]
        },
        placeholder: 'Enter Description',
        theme: 'snow'
    });
    const quill10 = new Quill(editorEventCreateRef1, {
        modules: {
            toolbar: [
                [{ 'font': [] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                ['blockquote', 'code-block'],
                ["image", "link", "video"]
            ]
        },
        placeholder: 'Enter Description',
        theme: 'snow'
    });
    const quill11 = new Quill(editorAppealCreateRef1, {
        modules: {
            toolbar: [
                [{ 'font': [] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                ['blockquote', 'code-block'],
                ["image", "link", "video"]
            ]
        },
        placeholder: 'Enter Description',
        theme: 'snow'
    });
    const quill12 = new Quill(editorVideoCreateRef1, {
        modules: {
            toolbar: [
                [{ 'font': [] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                ['blockquote', 'code-block'],
                ["image", "link", "video"]
            ]
        },
        placeholder: 'Enter Description',
        theme: 'snow'
    });

    return { quill1, quill2,quill3 ,quill4, quill5 , quill6 , quill7, quill8 , quill9, quill10, quill11,quill12  };
}
