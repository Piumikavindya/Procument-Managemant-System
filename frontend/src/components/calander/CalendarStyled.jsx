
import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    border: 1px;
    margin: 124px 0px 0px 0px;
   
    padding:80px;

    
`;

export const CalendarHead = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 30px;
    background:#00072D;
    color:white;
    height:60px;

    ion-icon{
        width:40px;
        height:40px;
    }
    
`;

export const SavenColGrid = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns:repeat(7,1fr);
    height: 30px;
  
  
    
`;

export const HeadDay = styled.span`
    text-align:center;
    background:#00072D;
    color:white;
    font-size: 1.2rem;
`;

export const CalendarBody = styled.div`
    height:calc(100% - 27px - 40px);
    display: grid;
    grid-template-columns: repeat(7,1fr);
    grid-template-rows: repeat(${({fourCol}) => fourCol? 4 : 5}, 1fr);
    
`;

export const StyleDay = styled.span`
   border:1px solid;
   text-align: right;
   padding: 10px;
   background:white;
   ${({active}) => active && `background: #FFDC26`};
`;

export const StyledEvent = styled.span`
    display:grid;
    text-align: left;
    background: ${({bgColor}) => bgColor || "#00072D"};
    color: white;
    padding: 2px 5px;
    border-radius:8px;
    margin: 5px 0;
    text-transform:capitalize;
    cursor:move;
`;

export const PortalWrapper = styled.div`
    background:#EBECFD;
    position: absolute;
    width: 60%;
    height:200px;
    top:50%;
    left:50%;
    border-radius:6px;
    transform:translate(-50%, -50%);
    box-shadow: 10px 10px 20px black;
    padding: 20px;

    h2{
        font-size: 2rem;
    }

    ion-icon{
        font-size: 2rem;
        color:white;
        background: #00072D;
        padding:8px 10px;
        border-radius:6px;
    }
    
    p{
       margin-bottom: 15px; 
       
    }

    ion-icon[name="close-circle-outline"]{
        position: absolute;
        top: 10px;
        right:10px;
        background: #00072D;
        color:white;
    }
`
