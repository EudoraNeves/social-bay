import './App.css';
import Header from './components/header/Header';
import Sidebar from './components/body/Sidebar';
import Feed from './components/body/Feed';
import Widget from './components/body/Widget';

function App() {
  return (
    <div className="App">
      {/* Header */}
      <Header />
      {/* App Body */}
      <div className="app__body">
        {/* Side Bar */}
        <Sidebar username="Hai Na" userTitle="Junior Web Developer" visitorsNum="300" postViewersNum="3" />
        {/* Feed */}
        <Feed />
        {/* Widget */}
        <Widget />
      </div>
    </div>
  );
}

export default App;
