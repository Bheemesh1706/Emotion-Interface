import {  BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from './pages/Home';
import Sentiment from './pages/Sentiment';
import Emotion from './pages/EmotionDetails';
import "./App.css";

export default function App() {
  return(
    <Router>
      <Switch>
        <Route exact path="/" component={ Home}/>
        <Route exact path="/emotion" component={Emotion}/>
        <Route exact path="/sentiment" component={ Sentiment}/>
      </Switch>
    </Router>
  );
}