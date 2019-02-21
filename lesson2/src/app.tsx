import React, { Component } from 'react';
import { ColorProperty } from 'csstype';

interface ColoredParagraphProps {
  color: ColorProperty;
}
const ColoredParagraph1: React.SFC<ColoredParagraphProps> = props => {
  const { color, children } = props;
  return <p style={{ color }}>{children}</p>;
};
class ColoredParagraph2 extends React.Component<ColoredParagraphProps> {
  constructor(props: any) {
    super(props);
  }
  render() {
    const { color, children } = this.props;
    return <p style={{ color }}>{children}</p>;
  }
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <ColoredParagraph1 color="red">red</ColoredParagraph1>
        <ColoredParagraph2 color="blue">blue</ColoredParagraph2>
      </div>
    );
  }
}

export default App;
