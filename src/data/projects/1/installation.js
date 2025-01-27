// src/data/projects/1/installation.js
import React from 'react';
import DropdownContent from '../../../components/shared/DropdownContent';

export const installationContent = {
  title: "INSTALLATION",
  sections: [
    {
      title: "LEARNING OBJECTIVES",
      content: "Understand how complex social problems are translated into algorithmic solutions. Identify what forms of knowledge resist quantification. Recognize the relationship between problem framing and solution constraints"
    },
    {
      title: "TECHNICAL CONCEPTS",
      content: "Problem framing and specification, requirements gathering, success metrics, and KPIs, feasibility assessment"
    },
    {
      title: "ETHICAL CONCEPTS",
      content: ""
    },
    {
      title: "DISAPPEARANCE LENS",
      content: ""
    },
    {
      title: "MAPPING ACTIVITY",
      content: ""
    }
  ]
};

function Installation() {
  return <DropdownContent title={installationContent.title} sections={installationContent.sections} />;
}

export default Installation;