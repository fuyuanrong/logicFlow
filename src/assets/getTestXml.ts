export default () => {
    return `<bpmn:definitions id="Definitions" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" targetNamespace="http://logic-flow.org" exporter="logicflow" exporterVersion="1.2.10">	
  <bpmn:process isExecutable="true" id="Process">	
      <bpmn:startEvent id="Event_DnOV6by" name="开始">	
          <bpmn:outgoing>Flow_uOvbm2G</bpmn:outgoing>	
      </bpmn:startEvent>	
      <bpmn:serviceTask id="ServiceTask_dRxh7Rr" name="服务任务">	
          <bpmn:incoming>Flow_uOvbm2G</bpmn:incoming>	
          <bpmn:outgoing>Flow_oRYUK7E</bpmn:outgoing>	
      </bpmn:serviceTask>	
      <bpmn:serviceTask id="ServiceTask_SmQviHM" name="服务任务">	
          <bpmn:incoming>Flow_xsNsCYl</bpmn:incoming>	
          <bpmn:outgoing>Flow_5DrLW6G</bpmn:outgoing>	
      </bpmn:serviceTask>	
      <bpmn:exclusiveGateway id="Gateway_np3qw07" name="互斥网关">	
          <bpmn:incoming>Flow_oRYUK7E</bpmn:incoming>	
          <bpmn:outgoing>Flow_xsNsCYl</bpmn:outgoing>	
          <bpmn:outgoing>Flow_MLPr1ZW</bpmn:outgoing>	
      </bpmn:exclusiveGateway>	
      <bpmn:endEvent id="Event_NJg4OFG" name="结束">	
          <bpmn:incoming>Flow_5DrLW6G</bpmn:incoming>	
          <bpmn:incoming>Flow_MLPr1ZW</bpmn:incoming>	
      </bpmn:endEvent>	
      <bpmn:sequenceFlow id="Flow_uOvbm2G" sourceRef="Event_DnOV6by" targetRef="ServiceTask_dRxh7Rr" />	
      <bpmn:sequenceFlow id="Flow_oRYUK7E" sourceRef="ServiceTask_dRxh7Rr" targetRef="Gateway_np3qw07" />	
      <bpmn:sequenceFlow id="Flow_5DrLW6G" sourceRef="ServiceTask_SmQviHM" targetRef="Event_NJg4OFG" />	
      <bpmn:sequenceFlow id="Flow_xsNsCYl" sourceRef="Gateway_np3qw07" targetRef="ServiceTask_SmQviHM" />	
      <bpmn:sequenceFlow id="Flow_MLPr1ZW" sourceRef="Gateway_np3qw07" targetRef="Event_NJg4OFG" />	
  </bpmn:process>	
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">	
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process">	
        <bpmndi:BPMNEdge id="Flow_uOvbm2G_di" bpmnElement="Flow_uOvbm2G">	
            <di:waypoint x="477" y="136.5" />	
            <di:waypoint x="477" y="233.5" />	
        </bpmndi:BPMNEdge>	
        <bpmndi:BPMNEdge id="Flow_oRYUK7E_di" bpmnElement="Flow_oRYUK7E">	
            <di:waypoint x="477" y="313.5" />	
            <di:waypoint x="477" y="420.5" />	
        </bpmndi:BPMNEdge>	
        <bpmndi:BPMNEdge id="Flow_5DrLW6G_di" bpmnElement="Flow_5DrLW6G">	
            <di:waypoint x="691" y="510.5" />	
            <di:waypoint x="691" y="683.5" />	
            <di:waypoint x="518" y="683.5" />	
        </bpmndi:BPMNEdge>	
        <bpmndi:BPMNEdge id="Flow_xsNsCYl_di" bpmnElement="Flow_xsNsCYl">	
            <di:waypoint x="527" y="470.5" />	
            <di:waypoint x="641" y="470.5" />	
        </bpmndi:BPMNEdge>	
        <bpmndi:BPMNEdge id="Flow_MLPr1ZW_di" bpmnElement="Flow_MLPr1ZW">	
            <di:waypoint x="477" y="520.5" />	
            <di:waypoint x="477" y="582" />	
            <di:waypoint x="478" y="582" />	
            <di:waypoint x="478" y="643.5" />	
        </bpmndi:BPMNEdge>	
        <bpmndi:BPMNShape id="Event_DnOV6by_di" bpmnElement="Event_DnOV6by">	
          <dc:Bounds x="457" y="76.5" width="40" height="40" />	
          <bpmndi:BPMNLabel>	
            <dc:Bounds x="467" y="89.5" width="20" height="14" />	
          </bpmndi:BPMNLabel>	
        </bpmndi:BPMNShape>	
        <bpmndi:BPMNShape id="ServiceTask_dRxh7Rr_di" bpmnElement="ServiceTask_dRxh7Rr">	
          <dc:Bounds x="427" y="233.5" width="100" height="80" />	
          <bpmndi:BPMNLabel>	
            <dc:Bounds x="457" y="266.5" width="40" height="14" />	
          </bpmndi:BPMNLabel>	
        </bpmndi:BPMNShape>	
        <bpmndi:BPMNShape id="Gateway_np3qw07_di" bpmnElement="Gateway_np3qw07">	
          <dc:Bounds x="427" y="430.5" width="100" height="80" />	
          <bpmndi:BPMNLabel>	
            <dc:Bounds x="457" y="463.5" width="40" height="14" />	
          </bpmndi:BPMNLabel>	
        </bpmndi:BPMNShape>	
        <bpmndi:BPMNShape id="ServiceTask_SmQviHM_di" bpmnElement="ServiceTask_SmQviHM">	
          <dc:Bounds x="641" y="430.5" width="100" height="80" />	
          <bpmndi:BPMNLabel>	
            <dc:Bounds x="671" y="463.5" width="40" height="14" />	
          </bpmndi:BPMNLabel>	
        </bpmndi:BPMNShape>	
        <bpmndi:BPMNShape id="Event_NJg4OFG_di" bpmnElement="Event_NJg4OFG">	
          <dc:Bounds x="458" y="663.5" width="40" height="40" />	
          <bpmndi:BPMNLabel>	
            <dc:Bounds x="468" y="676.5" width="20" height="14" />	
          </bpmndi:BPMNLabel>	
        </bpmndi:BPMNShape>	
    </bpmndi:BPMNPlane>	
  </bpmndi:BPMNDiagram>	
</bpmn:definitions>`;
}