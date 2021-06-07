import React from "react";
import "./ErrorSpan.css";

export default function ErrorSpan(props) {
  return (
    <>
      <p className="error-span">{props.message || ""}</p>
    </>
  );
}

// export default class ErrorBoundary extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = { error: null };
//     }

//     componentDidCatch(error, errorInfo) {
//         // Catch errors in any components below and re-render with error message
//         this.setState({
//           error: error,
//         })
//     }

//     render() {
//       if (this.state.hasError) {
//         // Можно отрендерить запасной UI произвольного вида
//         return <h1 className="error-span">{this.state.error.toString()}</h1>;
//       }

//       return this.props.children;
//     }
//   }
