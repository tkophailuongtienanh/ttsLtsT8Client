import logo from "./logo.svg";
import "./App.css";
import "./style/index.css";
import Toast from "./component/Toast";
import { useToast } from "./context/ToastContext";

function App() {
  const { addToast } = useToast();

  const showToast = () => {
    addToast("This is a toast message!", 3000);
  };
  const showToast2 = () => {
    addToast("This is a 6 message!", 60000);
  };

  return (
    <div className="App">
      <button onClick={showToast}>Show Toast</button>
      <button onClick={showToast2}>Show Toast 2</button>
      <Toast />
    </div>
  );
}

export default App;
