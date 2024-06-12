// -----------
// MOUX ORIGINAL
// -----------

import AxesTooltip from './tooltip/AxesTooltip'
import XAxis from './axes/XAxis'
import Utils from './tooltip/Utils'
import Position from './tooltip/Position'
/**
 * ApexCharts Core Reticule Class to handle the reticule generation.
 *
 * @module Reticule
 **/

export default class Reticule {
    constructor(ctx) {
        this.ctx = ctx;
        this.w = ctx.w;
        const w = this.w;

        this.rConfig = w.config.reticule;
        this.axesTooltip = new AxesTooltip(this)
        this.reticuleUtil = new Utils(this)
        this.reticulePosition = new Position(this)
    }

    drawReticule(xyRatios) {
        const w = this.w
        this.xyRatios = xyRatios
        this.isXAxisTooltipEnabled =
            w.config.xaxis.tooltip.enabled && w.globals.axisCharts
        this.yaxisTooltips = w.config.yaxis.map((y, i) => {
            return y.show && y.tooltip.enabled && w.globals.axisCharts ? true : false
        })
        if (w.globals.axisCharts) {
            this.axesTooltip.setXCrosshairWidth()

            let xAxis = new XAxis(this.ctx)
            this.xAxisTicksPositions = xAxis.getXAxisTicksPositions()
        }
        this.addSVGEvents()
    }

    getElGrid() {
        return this.w.globals.dom.baseEl.querySelector('.apexcharts-grid')
    }

    getElXCrosshairs() {
        return this.w.globals.dom.baseEl.querySelector('.apexcharts-xcrosshairs')
    }

    setXCrosshairWidth() {
        let w = this.w
        const chCtx = {}

        // set xcrosshairs width
        const xcrosshairs = getElXCrosshairs()
        chCtx.xcrosshairsWidth = parseInt(w.config.xaxis.crosshairs.width, 10)

        if (!w.globals.comboCharts) {
            if (w.config.xaxis.crosshairs.width === 'tickWidth') {
                let count = w.globals.labels.length
                chCtx.xcrosshairsWidth = w.globals.gridWidth / count
            } else if (w.config.xaxis.crosshairs.width === 'barWidth') {
                let bar = w.globals.dom.baseEl.querySelector('.apexcharts-bar-area')
                if (bar !== null) {
                    let barWidth = parseFloat(bar.getAttribute('barWidth'))
                    chCtx.xcrosshairsWidth = barWidth
                } else {
                    chCtx.xcrosshairsWidth = 1
                }
            }
        } else {
            let bar = w.globals.dom.baseEl.querySelector('.apexcharts-bar-area')
            if (bar !== null && w.config.xaxis.crosshairs.width === 'barWidth') {
                let barWidth = parseFloat(bar.getAttribute('barWidth'))
                chCtx.xcrosshairsWidth = barWidth
            } else {
                if (w.config.xaxis.crosshairs.width === 'tickWidth') {
                    let count = w.globals.labels.length
                    chCtx.xcrosshairsWidth = w.globals.gridWidth / count
                }
            }
        }

        if (w.globals.isBarHorizontal) {
            chCtx.xcrosshairsWidth = 0
        }
        if (xcrosshairs !== null && chCtx.xcrosshairsWidth > 0) {
            xcrosshairs.setAttribute('width', chCtx.xcrosshairsWidth)
        }
    }

    addSVGEvents() {
        const w = this.w
        let hoverArea = w.globals.dom.Paper.node
        const elGrid = this.getElGrid()
        if (elGrid) {
            this.seriesBound = elGrid.getBoundingClientRect()
        }

        let seriesHoverParams = {
            hoverArea,
            elGrid
        }
        this.addPathsEventListeners([hoverArea], seriesHoverParams)
    }

    addPathsEventListeners(paths, opts) {
        let self = this

        for (let p = 0; p < paths.length; p++) {
            let extendedOpts = {
                paths: paths[p],
                elGrid: opts.elGrid,
                hoverArea: opts.hoverArea
            }

            let events = ['mousemove', 'mouseup', 'touchmove', 'mouseout', 'touchend']

            events.map((ev) => {
                return paths[p].addEventListener(
                    ev,
                    self.onSeriesHover.bind(self, extendedOpts),
                    { capture: false, passive: true }
                )
            })
        }
    }

    onSeriesHover(opt, e) {
        debugger;
        if (e.type === 'mouseout' || e.type === 'touchend') {
            this.handleMouseOut(opt)
        }
        const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX
        const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY
        let seriesBound = opt.elGrid.getBoundingClientRect()
        if (
            clientY < seriesBound.top ||
            clientY > seriesBound.top + seriesBound.height
        ) {
            this.handleMouseOut(opt)
            return
        }
        let capj = this.reticuleUtil.getNearestValues({
            context: this,
            hoverArea: opt.hoverArea,
            elGrid: opt.elGrid,
            clientX,
            clientY
        })
        const bounds = opt.elGrid.getBoundingClientRect()
        if (capj.hoverX < 0 || capj.hoverX > bounds.width) {
            this.handleMouseOut(opt)
            return
        }
        this.w.globals.lastHover = { x: capj.hoverX, y: capj.hoverY }
        this.reticulePosition.moveXCrosshairs(capj.hoverX)
    }

    handleMouseOut() {
        const w = this.w

        const xcrosshairs = this.getElXCrosshairs()
        if (xcrosshairs !== null) {
            xcrosshairs.classList.remove('apexcharts-active')
        }
    }

}