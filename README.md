# apexpredator.js
My fork of apexcharts.js (v3.49.1).

## Changes
 - Panning has to be explicitly enabled by setting `options.chart.pan.enabled`
 - set `options.reticule.enabled` to `true` to enable a permanent x axis crosshair (`options.tooltip.enabled` must be set to `false`)
- `options.chart.events.preciseClick` will fire on click if `options.reticule.enabled` is set to `true` and deliver the following arguments:
  ```
      (
        event,
        chartContext,
        config,
        {
          x,
          y
        }
      )
  ```