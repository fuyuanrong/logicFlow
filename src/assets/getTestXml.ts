export default () => {
    return `<bpmn:definitions id="Definitions" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" targetNamespace="http://logic-flow.org" exporter="logicflow" exporterVersion="1.2.10">	
  <bpmn:process isExecutable="true" id="Process">	
      <bpmn:startEvent id="c8d5d2e0-00da-454b-9821-4d45548e5ee4" name="开始" width="80" height="80">	
          <bpmn:outgoing>2a48ac4d-0f98-4be8-9f48-9556046bd50c</bpmn:outgoing>	
      </bpmn:startEvent>	
      <bpmn:endEvent id="c35aef7b-864f-444b-bf45-a01602ad3e9b" name="结束" width="80" height="80">	
          <bpmn:incoming>a3cd2fff-6258-42d2-8ecb-8d186e29ccb2</bpmn:incoming>	
          <bpmn:incoming>8dd40e1a-4265-4f4f-9a71-0639f84e7e04</bpmn:incoming>	
      </bpmn:endEvent>	
      <bpmn:dataImportTask id="d9ab8e0b-db8f-4511-8128-4d29a7d7a323" name="数据源" width="100" height="80">	
          <bpmn:incoming>2a48ac4d-0f98-4be8-9f48-9556046bd50c</bpmn:incoming>	
          <bpmn:outgoing>5c403e3a-dfd2-4fdc-b2a8-cdb9c0bd49ec</bpmn:outgoing>	
      </bpmn:dataImportTask>	
      <bpmn:processorTask id="c1eb09a8-c170-4da5-b21d-7f2e655e376e" name="处理器" width="100" height="80">	
          <bpmn:incoming>480a94a2-a2cc-4c12-87e7-d9df287ac380</bpmn:incoming>	
          <bpmn:outgoing>a3cd2fff-6258-42d2-8ecb-8d186e29ccb2</bpmn:outgoing>	
      </bpmn:processorTask>	
      <bpmn:exclusiveGateway id="b4e6b95b-c29a-4e20-a333-feea1c23855e" name="排他网关" width="100" height="100">	
          <bpmn:incoming>5c403e3a-dfd2-4fdc-b2a8-cdb9c0bd49ec</bpmn:incoming>	
          <bpmn:outgoing>480a94a2-a2cc-4c12-87e7-d9df287ac380</bpmn:outgoing>	
          <bpmn:outgoing>113a8dc5-5a67-4ab0-8c49-6431d0e7276a</bpmn:outgoing>	
      </bpmn:exclusiveGateway>	
      <bpmn:dataSoruceTask id="09985b12-85a9-475d-8d17-124277301628" name="数据集" width="100" height="80">	
          <bpmn:incoming>113a8dc5-5a67-4ab0-8c49-6431d0e7276a</bpmn:incoming>	
          <bpmn:outgoing>8dd40e1a-4265-4f4f-9a71-0639f84e7e04</bpmn:outgoing>	
      </bpmn:dataSoruceTask>	
      <bpmn:sequenceFlow id="2a48ac4d-0f98-4be8-9f48-9556046bd50c" sourceRef="c8d5d2e0-00da-454b-9821-4d45548e5ee4" targetRef="d9ab8e0b-db8f-4511-8128-4d29a7d7a323" />	
      <bpmn:sequenceFlow id="a3cd2fff-6258-42d2-8ecb-8d186e29ccb2" sourceRef="c1eb09a8-c170-4da5-b21d-7f2e655e376e" targetRef="c35aef7b-864f-444b-bf45-a01602ad3e9b" />	
      <bpmn:sequenceFlow id="5c403e3a-dfd2-4fdc-b2a8-cdb9c0bd49ec" sourceRef="d9ab8e0b-db8f-4511-8128-4d29a7d7a323" targetRef="b4e6b95b-c29a-4e20-a333-feea1c23855e" />	
      <bpmn:sequenceFlow id="480a94a2-a2cc-4c12-87e7-d9df287ac380" sourceRef="b4e6b95b-c29a-4e20-a333-feea1c23855e" targetRef="c1eb09a8-c170-4da5-b21d-7f2e655e376e" />	
      <bpmn:sequenceFlow id="113a8dc5-5a67-4ab0-8c49-6431d0e7276a" sourceRef="b4e6b95b-c29a-4e20-a333-feea1c23855e" targetRef="09985b12-85a9-475d-8d17-124277301628" />	
      <bpmn:sequenceFlow id="8dd40e1a-4265-4f4f-9a71-0639f84e7e04" sourceRef="09985b12-85a9-475d-8d17-124277301628" targetRef="c35aef7b-864f-444b-bf45-a01602ad3e9b" />	
  </bpmn:process>	
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">	
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process">	
        <bpmndi:BPMNEdge id="2a48ac4d-0f98-4be8-9f48-9556046bd50c_di" bpmnElement="2a48ac4d-0f98-4be8-9f48-9556046bd50c">	
            <di:waypoint x="445" y="115" />	
            <di:waypoint x="445" y="145" />	
            <di:waypoint x="445.5" y="145" />	
            <di:waypoint x="445.5" y="134" />	
            <di:waypoint x="446" y="134" />	
            <di:waypoint x="446" y="164" />	
        </bpmndi:BPMNEdge>	
        <bpmndi:BPMNEdge id="a3cd2fff-6258-42d2-8ecb-8d186e29ccb2_di" bpmnElement="a3cd2fff-6258-42d2-8ecb-8d186e29ccb2">	
            <di:waypoint x="445" y="494" />	
            <di:waypoint x="445" y="600" />	
        </bpmndi:BPMNEdge>	
        <bpmndi:BPMNEdge id="5c403e3a-dfd2-4fdc-b2a8-cdb9c0bd49ec_di" bpmnElement="5c403e3a-dfd2-4fdc-b2a8-cdb9c0bd49ec">	
            <di:waypoint x="446" y="244" />	
            <di:waypoint x="446" y="274" />	
            <di:waypoint x="446" y="274" />	
            <di:waypoint x="446" y="249" />	
            <di:waypoint x="446" y="249" />	
            <di:waypoint x="446" y="279" />	
        </bpmndi:BPMNEdge>	
        <bpmndi:BPMNEdge id="480a94a2-a2cc-4c12-87e7-d9df287ac380_di" bpmnElement="480a94a2-a2cc-4c12-87e7-d9df287ac380">	
            <di:waypoint x="446" y="379" />	
            <di:waypoint x="446" y="409" />	
            <di:waypoint x="445.5" y="409" />	
            <di:waypoint x="445.5" y="384" />	
            <di:waypoint x="445" y="384" />	
            <di:waypoint x="445" y="414" />	
        </bpmndi:BPMNEdge>	
        <bpmndi:BPMNEdge id="113a8dc5-5a67-4ab0-8c49-6431d0e7276a_di" bpmnElement="113a8dc5-5a67-4ab0-8c49-6431d0e7276a">	
            <di:waypoint x="496" y="329" />	
            <di:waypoint x="639" y="329" />	
            <di:waypoint x="639" y="415" />	
        </bpmndi:BPMNEdge>	
        <bpmndi:BPMNEdge id="8dd40e1a-4265-4f4f-9a71-0639f84e7e04_di" bpmnElement="8dd40e1a-4265-4f4f-9a71-0639f84e7e04">	
            <di:waypoint x="639" y="495" />	
            <di:waypoint x="639" y="640" />	
            <di:waypoint x="485" y="640" />	
        </bpmndi:BPMNEdge>	
        <bpmndi:BPMNShape id="c8d5d2e0-00da-454b-9821-4d45548e5ee4_di" bpmnElement="c8d5d2e0-00da-454b-9821-4d45548e5ee4">	
          <dc:Bounds x="425" y="55" width="40" height="40" />	
          <bpmndi:BPMNLabel>	
            <dc:Bounds x="435" y="68" width="20" height="14" />	
          </bpmndi:BPMNLabel>	
        </bpmndi:BPMNShape>	
        <bpmndi:BPMNShape id="c35aef7b-864f-444b-bf45-a01602ad3e9b_di" bpmnElement="c35aef7b-864f-444b-bf45-a01602ad3e9b">	
          <dc:Bounds x="425" y="620" width="40" height="40" />	
          <bpmndi:BPMNLabel>	
            <dc:Bounds x="435" y="633" width="20" height="14" />	
          </bpmndi:BPMNLabel>	
        </bpmndi:BPMNShape>	
        <bpmndi:BPMNShape id="d9ab8e0b-db8f-4511-8128-4d29a7d7a323_di" bpmnElement="d9ab8e0b-db8f-4511-8128-4d29a7d7a323">	
          <dc:Bounds x="396" y="164" width="100" height="80" />	
          <bpmndi:BPMNLabel>	
            <dc:Bounds x="431" y="197" width="30" height="14" />	
          </bpmndi:BPMNLabel>	
        </bpmndi:BPMNShape>	
        <bpmndi:BPMNShape id="c1eb09a8-c170-4da5-b21d-7f2e655e376e_di" bpmnElement="c1eb09a8-c170-4da5-b21d-7f2e655e376e">	
          <dc:Bounds x="395" y="414" width="100" height="80" />	
          <bpmndi:BPMNLabel>	
            <dc:Bounds x="430" y="447" width="30" height="14" />	
          </bpmndi:BPMNLabel>	
        </bpmndi:BPMNShape>	
        <bpmndi:BPMNShape id="b4e6b95b-c29a-4e20-a333-feea1c23855e_di" bpmnElement="b4e6b95b-c29a-4e20-a333-feea1c23855e">	
          <dc:Bounds x="396" y="289" width="100" height="80" />	
          <bpmndi:BPMNLabel>	
            <dc:Bounds x="426" y="322" width="40" height="14" />	
          </bpmndi:BPMNLabel>	
        </bpmndi:BPMNShape>	
        <bpmndi:BPMNShape id="09985b12-85a9-475d-8d17-124277301628_di" bpmnElement="09985b12-85a9-475d-8d17-124277301628">	
          <dc:Bounds x="589" y="415" width="100" height="80" />	
          <bpmndi:BPMNLabel>	
            <dc:Bounds x="624" y="448" width="30" height="14" />	
          </bpmndi:BPMNLabel>	
        </bpmndi:BPMNShape>	
    </bpmndi:BPMNPlane>	
  </bpmndi:BPMNDiagram>	
</bpmn:definitions>`;
}