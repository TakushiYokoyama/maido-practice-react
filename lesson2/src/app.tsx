import React, { Component } from 'react';
import { ColorProperty } from 'csstype';
import { getStep } from './service';

interface ColoredParagraphProps {
  color: ColorProperty;
}
const ColoredParagraph1: React.SFC<ColoredParagraphProps> = props => {
  const { color } = props;
  const [step, setStep] = React.useState<number | undefined>(undefined);
  const asyncFunc = async () => {
    setStep(await getStep());
  };
  React.useEffect(() => {
    asyncFunc();
  }, []);
  return <p style={{ color }}>{step}</p>;
};
class ColoredParagraph2 extends React.Component<ColoredParagraphProps> {
  constructor(props: any) {
    super(props);
  }
  public async componentDidMount() {
    const step = await getStep();
    this.setState({ step });
  }
  public render() {
    const { color, children } = this.props;
    return <p style={{ color }}>{children}</p>;
  }
}
class App extends Component {
  public render() {
    return (
      <div className="App">
        <ColoredParagraph1 color="red">red</ColoredParagraph1>
        <ColoredParagraph2 color="blue">blue</ColoredParagraph2>
      </div>
    );
  }
}

export default App;
