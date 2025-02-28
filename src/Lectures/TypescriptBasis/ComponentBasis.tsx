import React, { Component, ReactNode, PropsWithChildren } from "react";
import { JsxElement } from "typescript";

/**
 * 1. 클래스 컴포넌트
 */
interface WelcomeProps {
  name: string;
}

//React.Component라는 클래스를 상속받아 사용 + props 타입 정의
class WelcomeClass extends React.Component<WelcomeProps> {}

/**
 * 2. 함수 컴포넌트
 */

function WelcomeFunc(props: WelcomeProps): JSX.Element {
  return <div></div>;
}

const WelcomeConst: React.FC<WelcomeProps> = ({ name }) => {
  return <div></div>;
};

const WelcomeConstJSXElement = ({ name }: WelcomeProps): JSX.Element => {
  return <div></div>;
};

const WithChildrenComponrnt = ({
  children,
}: PropsWithChildren<WelcomeProps>) => {
  return (
    <>
      <div>{children}</div>
    </>
  );
};

interface MyProps {
  icon: JSX.Element;
}

const item = ({ icon }: MyProps) => {
  const iconSize = icon.props.size;
  return <div>{icon}</div>;
};
type MyComponentProps = PropsWithChildren<MyProps>;

interface IconProps {
  size: number;
}

interface Props {
  icon: React.ReactElement<IconProps>;
}
const item2 = ({ icon }: Props) => {
  const iconSize = icon.props.size;

  return <div>{icon}</div>;
};
