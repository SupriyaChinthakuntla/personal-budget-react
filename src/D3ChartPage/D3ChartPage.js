import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const D3ChartPage = props => {

  const ref = useRef(null);
  const createPie = d3
    .pie()
    .value(d => d.budget)
    .sort(null);
  const createArc = d3
    .arc()
    .innerRadius(110)
    .outerRadius(170);
  const colors = 
  d3.scaleOrdinal(d3.scaleOrdinal)
  .range([ 'rgba(255, 99, 132, 0.5)',
  'rgba(54, 162, 0, 0.8)',
  'rgba(0, 255, 230, 0.2)',
  'rgba(22, 256, 192, 0.7)',
  'rgba(153, 102, 255, 0.5)',
  'rgba(0, 159, 64, 0.2)',
  'rgba(33, 159, 64, 0.3)',
  'rgba(55, 99, 255, 0.2)',
  'rgba(244, 244, 0, 0.7)']);

  useEffect(
    () => {
        debugger;
      const data = createPie(props.children[1]);
      const group = d3.select(ref.current);
      const groupWithData = group.selectAll("g.arc").data(data);

      groupWithData.exit().remove();

      const groupWithUpdate = groupWithData
        .enter()
        .append("g")
        .attr("class", "arc");

      const path = groupWithUpdate
        .append("path")
        .merge(groupWithData.select("path.arc"));

      path
        .attr("class", "arc")
        .attr("d", createArc)
        .attr("fill", (d, i) => colors(i));

      const text = groupWithUpdate
        .append("text")
        .merge(groupWithData.select("text"));

      text
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("transform", d => `translate(${createArc.centroid(d)})`)
        .style("fill", "black")
        .style('text-anchor', 'middle')
        .style('font-size', 12)
        .text(d => d.data.title);
    },
    [props.children[1]]
  );

  return (
    <svg width={600} height={600}>
      <g
        ref={ref}
        transform={`translate(${170} ${170})`}
      />
    </svg>
  );
};

export default D3ChartPage;
