import React, {Component} from 'react';
import * as d3 from 'd3';
import '../../Styles/D3Foure.css';
import axios from 'axios';

const DATA_URL = 'https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json';
let IMAGE = 'https://www.cs.mun.ca/~h65ped/Public/country%20data%20for%20force%20directed%20graph/flags.png';

let FLAGS = {
    ad: [-16, 0],
    ae: [-32, 0],
    af: [-48, 0],
    ag: [-64, 0],
    ai: [-80, 0],
    al: [-96, 0],
    am: [-112, 0],
    an: [-128, 0],
    ao: [-144, 0],
    ar: [-160, 0],
    as: [-176, 0],
    at: [-192, 0],
    au: [-208, 0],
    aw: [-224, 0],
    az: [-240, 0],
    ba: [0, -11],
    bb: [-16, -11],
    bd: [-32, -11],
    be: [-48, -11],
    bf: [-64, -11],
    bg: [-80, -11],
    bh: [-96, -11],
    bi: [-112, -11],
    bj: [-128, -11],
    bm: [-144, -11],
    bn: [-160, -11],
    bo: [-176, -11],
    br: [-192, -11],
    bs: [-208, -11],
    bt: [-224, -11],
    bv: [-240, -11],
    bw: [0, -22],
    by: [-16, -22],
    bz: [-32, -22],
    ca: [-48, -22],
    catalonia: [-64, -22],
    cd: [-80, -22],
    cf: [-96, -22],
    cg: [-112, -22],
    ch: [-128, -22],
    ci: [-144, -22],
    ck: [-160, -22],
    cl: [-176, -22],
    cm: [-192, -22],
    cn: [-208, -22],
    co: [-224, -22],
    cr: [-240, -22],
    cu: [0, -33],
    cv: [-16, -33],
    cw: [-32, -33],
    cy: [-48, -33],
    cz: [-64, -33],
    de: [-80, -33],
    dj: [-96, -33],
    dk: [-112, -33],
    dm: [-128, -33],
    do: [-144, -33],
    dz: [-160, -33],
    ec: [-176, -33],
    ee: [-192, -33],
    eg: [-208, -33],
    eh: [-224, -33],
    england: [-240, -33],
    er: [0, -44],
    es: [-16, -44],
    et: [-32, -44],
    eu: [-48, -44],
    fi: [-64, -44],
    fj: [-80, -44],
    fk: [-96, -44],
    fm: [-112, -44],
    fo: [-128, -44],
    fr: [-144, -44],
    ga: [-160, -44],
    gb: [-176, -44],
    gd: [-192, -44],
    ge: [-208, -44],
    gf: [-224, -44],
    gg: [-240, -44],
    gh: [0, -55],
    gi: [-16, -55],
    gl: [-32, -55],
    gm: [-48, -55],
    gn: [-64, -55],
    gp: [-80, -55],
    gq: [-96, -55],
    gr: [-112, -55],
    gs: [-128, -55],
    gt: [-144, -55],
    gu: [-160, -55],
    gw: [-176, -55],
    gy: [-192, -55],
    hk: [-208, -55],
    hm: [-224, -55],
    hn: [-240, -55],
    hr: [0, -66],
    ht: [-16, -66],
    hu: [-32, -66],
    ic: [-48, -66],
    id: [-64, -66],
    ie: [-80, -66],
    il: [-96, -66],
    im: [-112, -66],
    in: [-128, -66],
    io: [-144, -66],
    iq: [-160, -66],
    ir: [-176, -66],
    is: [-192, -66],
    it: [-208, -66],
    je: [-224, -66],
    jm: [-240, -66],
    jo: [0, -77],
    jp: [-16, -77],
    ke: [-32, -77],
    kg: [-48, -77],
    kh: [-64, -77],
    ki: [-80, -77],
    km: [-96, -77],
    kn: [-112, -77],
    kp: [-128, -77],
    kr: [-144, -77],
    kurdistan: [-160, -77],
    kw: [-176, -77],
    ky: [-192, -77],
    kz: [-208, -77],
    la: [-224, -77],
    lb: [-240, -77],
    lc: [0, -88],
    li: [-16, -88],
    lk: [-32, -88],
    lr: [-48, -88],
    ls: [-64, -88],
    lt: [-80, -88],
    lu: [-96, -88],
    lv: [-112, -88],
    ly: [-128, -88],
    ma: [-144, -88],
    mc: [-160, -88],
    md: [-176, -88],
    me: [-192, -88],
    mg: [-208, -88],
    mh: [-224, -88],
    mk: [-240, -88],
    ml: [0, -99],
    mm: [-16, -99],
    mn: [-32, -99],
    mo: [-48, -99],
    mp: [-64, -99],
    mq: [-80, -99],
    mr: [-96, -99],
    ms: [-112, -99],
    mt: [-128, -99],
    mu: [-144, -99],
    mv: [-160, -99],
    mw: [-176, -99],
    mx: [-192, -99],
    my: [-208, -99],
    mz: [-224, -99],
    na: [-240, -99],
    nc: [0, -110],
    ne: [-16, -110],
    nf: [-32, -110],
    ng: [-48, -110],
    ni: [-64, -110],
    nl: [-80, -110],
    no: [-96, -110],
    np: [-112, -110],
    nr: [-128, -110],
    nu: [-144, -110],
    nz: [-160, -110],
    om: [-176, -110],
    pa: [-192, -110],
    pe: [-208, -110],
    pf: [-224, -110],
    pg: [-240, -110],
    ph: [0, -121],
    pk: [-16, -121],
    pl: [-32, -121],
    pm: [-48, -121],
    pn: [-64, -121],
    pr: [-80, -121],
    ps: [-96, -121],
    pt: [-112, -121],
    pw: [-128, -121],
    py: [-144, -121],
    qa: [-160, -121],
    re: [-176, -121],
    ro: [-192, -121],
    rs: [-208, -121],
    ru: [-224, -121],
    rw: [-240, -121],
    sa: [0, -132],
    sb: [-16, -132],
    sc: [-32, -132],
    scotland: [-48, -132],
    sd: [-64, -132],
    se: [-80, -132],
    sg: [-96, -132],
    sh: [-112, -132],
    si: [-128, -132],
    sk: [-144, -132],
    sl: [-160, -132],
    sm: [-176, -132],
    sn: [-192, -132],
    so: [-208, -132],
    somaliland: [-224, -132],
    sr: [-240, -132],
    ss: [0, -143],
    st: [-16, -143],
    sv: [-32, -143],
    sx: [-48, -143],
    sy: [-64, -143],
    sz: [-80, -143],
    tc: [-96, -143],
    td: [-112, -143],
    tf: [-128, -143],
    tg: [-144, -143],
    th: [-160, -143],
    tibet: [-176, -143],
    tj: [-192, -143],
    tk: [-208, -143],
    tl: [-224, -143],
    tm: [-240, -143],
    tn: [0, -154],
    to: [-16, -154],
    tr: [-32, -154],
    tt: [-48, -154],
    tv: [-64, -154],
    tw: [-80, -154],
    tz: [-96, -154],
    ua: [-112, -154],
    ug: [-128, -154],
    um: [-144, -154],
    us: [-160, -154],
    uy: [-176, -154],
    uz: [-192, -154],
    va: [-208, -154],
    vc: [-224, -154],
    ve: [-240, -154],
    vg: [0, -165],
    vi: [-16, -165],
    vn: [-32, -165],
    vu: [-48, -165],
    wales: [-64, -165],
    wf: [-80, -165],
    ws: [-96, -165],
    xk: [-112, -165],
    ye: [-128, -165],
    yt: [-144, -165],
    za: [-160, -165],
    zanzibar: [-176, -165],
    zm: [-192, -165],
    zw: [-208, -165]
};


export default class ExampleFoure extends Component {
    state = {
        width: 800,
        height: 800
    };

    componentDidMount() {

        // target svg

        let graphic = d3.select("svg")
            .style("color", "black")
            .style("background-color", "white")
            .attr("width", this.state.width)
            .attr("height", this.state.height);

        let defs = graphic.append("defs");

        Object.keys(FLAGS).forEach(f => {
            defs.append('pattern')
                .attr('id', 'flag-' + f)
                .attr('patternUnits', 'objectBoundingBox')
                .attr('width', 16)
                .attr('height', 11)
                .append("image")
                .attr("xlink:href", IMAGE)
                .attr('x', FLAGS[f][0])
                .attr('y', FLAGS[f][1])
                .attr('width', 256)
                .attr('height', 176);
        });
        //
        // let color = d3.scaleOrdinal(d3.schemeCategory10);
        //
        axios.get(DATA_URL).then((response) => {
            let data = response.data;
            let force = d3.forceSimulation(data.nodes)
                .force('x', d3.forceX(this.state.width / 2))
                .force('y', d3.forceY(this.state.height / 2))
                .force('charge', d3.forceManyBody())
                .force("link", d3.forceLink().distance((d) => 20));

            force.force('link').links(data.links);

            let link = graphic.selectAll(".d3-line")
                .data(data.links)
                .enter().append("line")
                .attr("class", "d3-line")
                .style("stroke-width", function (d) {
                    return Math.sqrt(d.value);
                });
            //Drag functions
            const dragStart = d => {
                if (!d3.event.active) force.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            };

            const drag = d => {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
            };

            const dragEnd = d => {
                if (!d3.event.active) force.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            };

            let node = graphic.selectAll(".d3-node")
                .data(data.nodes)
                .enter().append("rect")
                .attr("class", "d3-node")
                .style("fill", d => 'url(#flag-' + d.code + ')')
                .call(d3.drag()
                    .on('start', dragStart)
                    .on('drag', drag)
                    .on('end', dragEnd));


            node.append("title")
                .text(function (d) {
                    return d.country;
                });

            force.nodes(data.nodes)
                .on("tick", function () {
                    link.attr("x1", function (d) {
                        return d.source.x;
                    })
                        .attr("y1", function (d) {
                            return d.source.y;
                        })
                        .attr("x2", function (d) {
                            return d.target.x;
                        })
                        .attr("y2", function (d) {
                            return d.target.y;
                        });
                    // fixing glitches with Math.round
                    node.attr("x", function (d) {
                        return Math.round(d.x - 8);
                    })
                        .attr("y", function (d) {
                            return Math.round(d.y - 5);
                        });
                });
            data.nodes = data.nodes.slice(0, 1);
            data.links = [];

        });
    }

    render() {
        return (
            <div className="container">
                <svg className="d3-graphic" ref="d3Graphic">
                </svg>
            </div>
        );
    }
}