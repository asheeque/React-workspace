import  classes from "./HtmlContent.module.css";


const HtmlContent = ({ type, children }) => {
    const Component = type;
    return <Component className={`${type==='code'?classes.SectionWrapper:''}`}>{children}</Component>;
  };
  
  export default HtmlContent;
  