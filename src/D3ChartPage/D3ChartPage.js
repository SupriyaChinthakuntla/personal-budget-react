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
  const colors = d3.scaleOrdinal(d3.schemeCategory10);
  const format = d3.format(".2f");

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
        .style("fill", "white")
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
