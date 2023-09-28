import { Input, Button, message } from "antd";
import { useState } from "react";
import { Title } from "./CommonStyles";
import styled from "styled-components";
import { FileImageOutlined } from "@ant-design/icons";
import html2canvas from "html2canvas";

const { TextArea } = Input;

const DiaryInput = ({ isLoading, onSubmit, messageApi }) => {
  const [userInput, setUserInput] = useState("");
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };
  const handleClick = () => {
    if (!userInput) {
      messageApi.open({
        type: "error",
        content: "Write a diary.",
      });
      return;
    }
    messageApi.open({
      type: "success",
      content: "Your diary is being processed.",
    });

    onSubmit(userInput);
    setUserInput(null);
  };

  const captureAndDownload = async () => {
    const nodeToCapture = document.getElementById("capture");
    html2canvas(nodeToCapture, {
      allowTaint: true,
      useCORS: true,
    }).then(function (canvas) {
      const image = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = image;
      a.download = "gpt-diary-result.png";
      a.click();
    });

    // const elementToCapture = document.getElementById("capture");
    // const { cropPositionTop, cropPositionLeft, cropWidth, cropHeigth } = {
    //   cropPositionTop: 0,
    //   cropPositionLeft: 0,
    //   cropWidth: elementToCapture.offsetWidth,
    //   cropHeigth: elementToCapture.offsetHeight,
    // };

    // html2canvas(elementToCapture).then((canvas) => {
    //   let croppedCanvas = document.createElement("canvas");
    //   let croppedCanvasContext = croppedCanvas.getContext("2d");

    //   croppedCanvas.width = cropWidth;
    //   croppedCanvas.height = cropHeigth;

    //   croppedCanvasContext.drawImage(canvas, cropPositionLeft, cropPositionTop);

    //   const a = document.createElement("a");
    //   a.href = croppedCanvas.toDataURL();
    //   a.download = "receipt.png";
    //   a.click();
    // });
  };

  return (
    <div>
      <Title>My Diary;</Title>
      <TextArea
        value={userInput}
        onChange={handleUserInput}
        placeholder="Write your diary here."
        style={{ height: "200px" }}
      />
      <ButtonContainer>
        <Button loading={isLoading} onClick={handleClick}>
        Provide me a memoir for my diary!
        </Button>
        <Button
          icon={<FileImageOutlined />}
          loading={isLoading}
          onClick={captureAndDownload}
        >
          Save
        </Button>
      </ButtonContainer>
      <canvas id="canvas" style={{ display: "none" }}></canvas>
    </div>
  );
};

export default DiaryInput;

const ButtonContainer = styled.div`
  margin: 20px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  gap: 5px;
`;