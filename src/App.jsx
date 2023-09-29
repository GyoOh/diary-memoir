import { useState } from 'react'
import { CallGPT } from './api/gpt';
import DiaryInput from './components/DiaryInput';
import styled from 'styled-components'
import logo from "./assets/logo.png"
import DiaryDisplay from './components/DiaryDisplay';
import { message } from "antd";
import {
  DiaryContainer,
  ResultTitle,
  Divider,
  CardContainer,
  CardTitle,
  CardContent,
  ActionListItem,
  LoadingContainer,
  LogoImg
} from "./components/CommonStyles";
import {
  EditTwoTone
} from "@ant-design/icons";

function App() {
  const [data, setData] = useState({
    title: "",
    thumbnail: "https://source.unsplash.com/1600x900/?start",
    summary: "",
    emotional_result: "",
    emotional_content: "",
    analysis: "",
    action_list: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
 
  const handleClickAPICall = async (userInput) => {
    try {
      setIsLoading(true);
      const message = await CallGPT({
        prompt: `${userInput}`,
      });
      setData(JSON.parse(message));
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error?.message,
      });
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (userInput) => {
    handleClickAPICall(userInput);
  };

  return (
    <AppConatiner>
      {contextHolder}
      <AppTitle>
    GPT Counselor<LogoImg src={logo}></LogoImg>
      </AppTitle>
      <CardContainer>
        <CardTitle>
          <EditTwoTone
            twoToneColor={"#B5EAD7"}
            style={{ marginRight: "20px", }}
          />
         Write your diary and get feedback from GPT-3.
        </CardTitle>
      </CardContainer>
      <DiaryInput
        messageApi={messageApi}
        isLoading={isLoading}
        onSubmit={handleSubmit}
      />
      <div id="capture">
        <DiaryDisplay isLoading={isLoading} data={data} />
      </div>
    </AppConatiner>
  );
}

export default App;

const AppConatiner = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0px;
    margin: 0px;
  }
`;

const AppTitle = styled.div`
  width: 100%;
  font-weight: 400;
  font-size: 35px;
  text-align: center;
  font-family: "Noto Serif KR";
`;