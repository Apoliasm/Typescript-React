import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GuguDan from './Lectures/guguDan';
import ComponentBasis from './Lectures/ComponentBasis';
import Lecture from './Lectures/Chapter3/Lecture';
import HookBasis from './Lectures/Chapter4/HookBasis';
import RenderFunctionalComp from './Lectures/Chapter4/RenderFunctionalComp';
import Accordion from './Lectures/Chapter4/Accordion';
import EventLink from './Lectures/Chapter5/EventLink';

function App() {
  const rear:Array<number> = [1,2,3,4,5,6,7,8,9];
  const front:Array<number> = [2,3,4,6,7,8,9]
  return (
    <div className="App">
      <EventLink></EventLink>
      <Accordion title='타이틀' content='this is content'/>
      {/* <RenderFunctionalComp></RenderFunctionalComp> */}
      {/* <HookBasis></HookBasis> */}
      {/* <Lecture></Lecture> */}
      {/* <ComponentBasis></ComponentBasis> */}
      {/* <GuguDan></GuguDan> */}
    </div>
  );
}

// Component

export default App;
