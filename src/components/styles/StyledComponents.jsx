import { Skeleton, keyframes, styled} from '@mui/material'
import {Link as LinkComponent} from 'react-router-dom'
import { grayColor, matBlack } from '../../constants/color';


const VisuallyHiddenInput = styled("input")({
    border:"0",
    clip:"rect(0 0 0 0 )",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    whiteSpace: "nowrap",
    width: 1,
})

const Link = styled(LinkComponent)`
text-decoration: none;
z-index:1;
color: black;
padding: 1rem;
&:hover {
 background-color: rgba(0,0,0,0.1);
border-radius: 10px 0 0 10px;
}`;

const InputBox = styled("input")`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 3rem;
  border-radius: 1.5rem;
  font-family:"Readex Pro";
  background-color: ${grayColor};
`;

const SearchField = styled("input")`
  padding: 0.3rem 1rem;
  width: 20vmax;
  border: 1px solid #444141;
  outline: none;
  border-radius: 1rem;
  font-family:Readex Pro;
  background-color: white;
  font-size: 0.8rem;
  color: #444141;
`;

const CurveButton = styled("button")`
  border-radius: 1.5rem;
  padding: 1rem 2rem;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: ${matBlack};
  color: white;
  font-size: 1.1rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const bounceAnimation = keyframes`
0% { transform: scale(1); }
50% { transform: scale(1.5); }
100% { transform: scale(1); }
`;

const BouncingSkeleton = styled(Skeleton)(() => ({
  animation: `${bounceAnimation} 1s infinite`,
}));

export {
  CurveButton,
  SearchField,
  InputBox,
  Link,
  VisuallyHiddenInput,
  BouncingSkeleton,
};