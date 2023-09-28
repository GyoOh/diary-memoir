import { useState } from 'react'
import { CallGPT } from './api/gpt';
import DiaryInput from './components/DiaryInput';
import styled from 'styled-components'
import logo from "./assets/logo.png"
import DiaryDisplay from './components/DiaryDisplay';
import { message } from "antd";
import { LogoImg } from './components/CommonStyles';

const dummyData = JSON.parse(`{ "title": "Learning React and Backend", "thumbnail": "https://source.unsplash.com/1600x900/?coding", "summary": "Watched coding lectures, learned React but unsure about backend", "emotional_content": "Today, I spent some time watching coding lectures on YouTube. It was exciting to learn about React and how to make a React app. I felt a sense of accomplishment as I followed along with the tutorials and successfully created a simple React application. However, as I delved deeper into the topic, I realized that I don't know how to make a backend server. This realization brought about a mix of emotions - curiosity, uncertainty, and a tinge of self-doubt. I started questioning whether learning backend development would be a good experience for me. Would I be able to grasp the concepts? Would it be too overwhelming? These thoughts filled my mind and left me feeling a bit anxious.", "emotional_result": "This emotional experience highlights my eagerness to learn and grow in the field of coding. However, it also reveals my fear of the unknown and the uncertainty that comes with venturing into new territories. It's natural to feel a bit overwhelmed when faced with unfamiliar concepts, but it's important to remember that learning is a process. By acknowledging my doubts and fears, I can work towards addressing them and gradually gaining the knowledge and skills needed to tackle backend development.", "analysis": "As Carl Jung once said, 'Until you make the unconscious conscious, it will direct your life and you will call it fate.' This quote resonates with the situation at hand. My uncertainty about learning backend development stems from underlying fears and doubts that reside within my unconscious mind. By bringing these unconscious thoughts and emotions to light through introspection and self-reflection, I can gain a better understanding of myself and overcome any obstacles that may come my way during this learning journey.", "action_list": ["1. Embrace the unknown: Instead of letting fear hold me back, I will embrace the unknown and view it as an opportunity for growth and learning.", "2. Break it down: Instead of getting overwhelmed by the concept of backend development, I will break it down into smaller, manageable tasks and focus on learning one step at a time.", "3. Seek guidance: Instead of trying to figure it all out on my own, I will seek guidance from experienced developers or online communities to learn from their expertise and insights."] }`
  );

function App() {
  const [data, setData] = useState(dummyData);
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
     Gyo's Psychological Counselor GPT<LogoImg src={logo}></LogoImg>
      </AppTitle>
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