import styled from "styled-components";


export const Container = styled.div`
    display: none;
    flex-direction: column;
    align-items: center;
`

export const UploadWrapper = styled.div`
    position: relative;
    overflow: hidden;
    background: none;
    display: inline-block;
`;

export const UploadButton = styled.button`
    border: none;
    color: white;
    outline: none;
    background: none;
    font-size: 60px;
    font-weight: bold;
`;

export const SubmitButton = styled.button`
    border: none;
    color: white;
    background-color: #95CB28;
    font-size: 18px;
    margin-top: 20px;
    padding: 8px 20px;
    border-radius: 12px;
`;
export const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

export const CvBox = styled.div`
    padding: 0 0px;
`

export const AddCV = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #95CB28;
    color: white;
    h1 {
        color: white;
    };
    p {
        color: gray;
    };
`;