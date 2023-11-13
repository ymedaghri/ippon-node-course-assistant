import React from "react";

interface SVGTextWrapperProps {
    text: string;
    maxWidth: number;
    fill: string;
    fontFamily: string;
    x: number;
    y: number;
    fontSize?: number;
    lineHeight?: number;
}

export const SVGTextWrapper: React.FC<SVGTextWrapperProps> = ({
    text,
    maxWidth,
    fill,
    x,
    y,
    fontSize = 12,
    fontFamily,
    lineHeight = 13
}) => {
    const words = text.split(' ');
    let currentLine = words[0];
    const lines = [];

    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        if (currentLine.length + word.length > maxWidth) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine += ' ' + word;
        }
    }
    lines.push(currentLine);

    return (
        <>
            {lines.map((line, index) => (
                <text
                    key={index}
                    x={x}
                    y={y + (index * lineHeight)}
                    fontSize={fontSize}
                    fontFamily={fontFamily}
                    fill={fill}
                >
                    {line}
                </text>
            ))}
        </>
    );
};

export default function QuestionsPanel({ show, question }: { show: boolean, question?: { text: string, answer_1: string, answer_2: string, answer_3: string } }) {

    if (show && question) {
        setTimeout(() => {
            const textElement = document.getElementById('main_text_id');
            //wrapSvgText(textElement, 100); // 100 is the max width for text wrapping
        }, 1000)

        return (
            <g transform="matrix(1, 0, 0, 1, 0, 0)">
                <rect x="74.833" y="105.101" width="310.423" height="202.567" strokeWidth={"4px"} stroke="#ff2b61" fill="#f7f1f1" rx="5" ry="5" />

                {
                    SVGTextWrapper({
                        fontFamily: "Arial, sans-serif", x: 90, y: 130, maxWidth: 45, fontSize: 12, fill: "#333", text: question.text
                    })
                }

                <ellipse fill="#f75f5f" stroke="#cb0000" cx="110.102" cy="199.155" rx="15.647" ry="15.647" />
                <text fontFamily="Arial, sans-serif" fontSize="12px" style={{ whiteSpace: "pre", fill: "#fff" }} x="106" y="203">1</text>
                {
                    SVGTextWrapper({
                        fontFamily: "Arial, sans-serif", x: 135, y: 193, maxWidth: 50, fontSize: 10, fill: "#333", text: question.answer_1
                    })
                }

                <ellipse fill="#f75f5f" stroke="#cb0000" cx="110.58" cy="239.003" rx="15.647" ry="15.647" />
                <text fontFamily="Arial, sans-serif" fontSize="12px" style={{ whiteSpace: "pre", fill: "#fff" }} x="106" y="243">2</text>
                {
                    SVGTextWrapper({
                        fontFamily: "Arial, sans-serif", x: 135, y: 233, maxWidth: 60, fontSize: 10, fill: "#333", text: question.answer_2
                    })
                }

                <ellipse fill="#f75f5f" stroke="#cb0000" cx="110.58" cy="279.003" rx="15.647" ry="15.647" />
                <text fontFamily="Arial, sans-serif" fontSize="12px" style={{ whiteSpace: "pre", fill: "#fff" }} x="106" y="283">3</text>
                {
                    SVGTextWrapper({
                        fontFamily: "Arial, sans-serif", x: 135, y: 278, maxWidth: 50, fontSize: 10, fill: "#333", text: question.answer_3
                    })
                }
            </g>
        )
    }
}