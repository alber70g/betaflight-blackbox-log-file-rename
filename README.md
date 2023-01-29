# Betaflight Blackbox log renamer

I found it hard to compare different settings I did in the field. So this way
you can quickly analyse what settings are different, and rename the files
accordingly

```
Usage: betaflight-blackbox-log-file-rename autorename <mapping> --dry <fileglob>
  mapping example: "simplified_d_gain=slider_d,simplified_pi_gain=slider_pi"

autorename example:
  betaflight-blackbox-log-file-rename autorename "simplified_d_gain=slider_d,simplified_pi_gain=slider_pi" "*.bfl"
```

- [Betaflight Blackbox log renamer](#betaflight-blackbox-log-renamer)
	- [Analyse for differences](#analyse-for-differences)
	- [Run dry-run to preview changes](#run-dry-run-to-preview-changes)
	- [Real run](#real-run)

## Analyse for differences

```sh
$ betaflight-blackbox-log-file-rename autorename "*"

INFO: No mapping provided, files will not change. Continuing with analysis
Found differences in the following headers:
Field I encoding                        : 1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0, 1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,3,1,0,0,0,0,0,0,1,0,0,0
Field P predictor                       : 6,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3, 6,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,3,3,3,3,3,3,3
Field P encoding                        : 9,0,0,0,0,7,7,7,0,0,0,0,0,8,8,8,8,8,8,8,8,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 9,0,0,0,0,7,7,7,0,0,0,8,8,8,8,6,6,0,0,0,0,0,0,0,0,0,0
Firmware revision                       : Betaflight 4.3.2 (60c9521) STM32F405, Betaflight 3.2.3 (cb962eda1) OMNIBUSF4SD
Firmware date                           : Nov 28 2022 07:26:30, Dec 11 2017 07:56:44
simplified_d_gain                       : 100, 125
simplified_pi_gain                      : 100, 125
simplified_dterm_filter_multiplier      : 100, 120, 130
simplified_gyro_filter_multiplier       : 100, 120, 130
```

## Run dry-run to preview changes

Based on mapping will rename the files to include the values in the mapping.
Should be in order that you provide the mapping

`undefined` will show up when using logs over multiple versions, where some
headers aren't available

```sh
$ betaflight-blackbox-log-file-rename autorename "simplified_d_gain=slider_d,simplified_pi_gain=slider_pi" --dry  "*"

Renaming "CADDX000076 +2.920 clean props.BFL" to             "CADDX000076 +2.920 clean props_slider_d-100_slider_pi-100.bfl"
Renaming "LOG00013.BFL" to                                   "LOG00013_slider_d-100_slider_pi-100.bfl"
Renaming "LOG00058.BFL" to                                   "LOG00058_slider_d-125_slider_pi-125.bfl"
Renaming "LOG00061.BFL" to                                   "LOG00061_slider_d-125_slider_pi-125.bfl"
Renaming "LOG00062.BFL" to                                   "LOG00062_slider_d-125_slider_pi-125.bfl"
Renaming "LOG00004.BFL" to                                   "LOG00004_slider_d-undefined_slider_pi-undefined.bfl"
```

## Real run

```sh
$ betaflight-blackbox-log-file-rename autorename "simplified_d_gain=sd,simplified_pi_gain=spi" --dry  "*"

Renaming "CADDX000076 +2.920 clean props.BFL" to             "CADDX000076 +2.920 clean props_slider_d-100_slider_pi-100.bfl"
Renaming "LOG00013.BFL" to                                   "LOG00013_slider_d-100_slider_pi-100.bfl"
Renaming "LOG00058.BFL" to                                   "LOG00058_slider_d-125_slider_pi-125.bfl"
Renaming "LOG00061.BFL" to                                   "LOG00061_slider_d-125_slider_pi-125.bfl"
Renaming "LOG00062.BFL" to                                   "LOG00062_slider_d-125_slider_pi-125.bfl"
Renaming "LOG00004.BFL" to                                   "LOG00004_slider_d-undefined_slider_pi-undefined.bfl"
```
