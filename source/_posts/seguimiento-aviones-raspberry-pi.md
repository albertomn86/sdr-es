---
title: seguimiento aviones raspberri pi
date: 2020-04-20 10:56:04
tags:
---

```
sudo apt-get install build-essential librtlsdr-dev git libncurses5-dev
```

```
git clone https://github.com/flightaware/dump1090.git
```

```
cd dump1090
```

```
make BLADERF=no
```

```
-----------------------------------------------------------------------------
| dump1090 ModeS Receiver                                      dump1090-fa  |
| build options: ENABLE_RTLSDR ENABLE_BLADERF                               |
-----------------------------------------------------------------------------

--device-type <type>     Select SDR type (default: rtlsdr)

      rtlsdr-specific options (use with --device-type rtlsdr)

--device <index|serial>  select device by index or serial number
--enable-agc             enable digital AGC (not tuner AGC!)
--ppm <correction>       set oscillator frequency correction in PPM
--direct <0|1|2>         set direct sampling mode

      ifile-specific options (use with --ifile)

--ifile <path>           read samples from given file ('-' for stdin)
--iformat <type>         set sample format (UC8, SC16, SC16Q11)
--throttle               process samples at the original capture speed

      Common options

--gain <db>              Set gain (default: max gain. Use -10 for auto-gain)
--freq <hz>              Set frequency (default: 1090 Mhz)
--interactive            Interactive mode refreshing data on screen. Implies --throttle
--interactive-ttl <sec>  Remove from list if idle for <sec> (default: 60)
--raw                    Show only messages hex values
--net                    Enable networking
--modeac                 Enable decoding of SSR Modes 3/A & 3/C
--no-modeac-auto         Don't enable Mode A/C if requested by a Beast connection
--net-only               Enable just networking, no RTL device or file used
--net-bind-address <ip>  IP address to bind to (default: Any; Use 127.0.0.1 for private)
--net-ri-port <ports>    TCP raw input listen ports  (default: 30001)
--net-ro-port <ports>    TCP raw output listen ports (default: 30002)
--net-sbs-port <ports>   TCP BaseStation output listen ports (default: 30003)
--net-bi-port <ports>    TCP Beast input listen ports  (default: 30004,30104)
--net-bo-port <ports>    TCP Beast output listen ports (default: 30005)
--net-ro-size <size>     TCP output minimum size (default: 0)
--net-ro-interval <rate> TCP output memory flush rate in seconds (default: 0)
--net-heartbeat <rate>   TCP heartbeat rate in seconds (default: 60 sec; 0 to disable)
--net-buffer <n>         TCP buffer size 64Kb * (2^n) (default: n=0, 64Kb)
--net-verbatim           Make Beast-format output connections default to verbatim mode
                         (forward all messages, without applying CRC corrections)
--forward-mlat           Allow forwarding of received mlat results to output ports
--lat <latitude>         Reference/receiver latitude for surface posn (opt)
--lon <longitude>        Reference/receiver longitude for surface posn (opt)
--max-range <distance>   Absolute maximum range for position decoding (in nm, default: 300)
--fix                    Enable single-bits error correction using CRC
                         (specify twice for two-bit error correction)
--no-fix                 Disable error correction using CRC
--no-crc-check           Disable messages with broken CRC (discouraged)
--mlat                   display raw messages in Beast ascii mode
--stats                  With --ifile print stats at exit. No other output
--stats-range            Collect/show range histogram
--stats-every <seconds>  Show and reset stats every <seconds> seconds
--onlyaddr               Show only ICAO addresses (testing purposes)
--metric                 Use metric units (meters, km/h, ...)
--gnss                   Show altitudes as HAE/GNSS (with H suffix) when available
--snip <level>           Strip IQ file removing samples < level
--debug <flags>          Debug mode (verbose), see README for details
--quiet                  Disable output to stdout. Use for daemon applications
--show-only <addr>       Show only messages from the given ICAO on stdout
--write-json <dir>       Periodically write json output to <dir> (for serving by a separate webserver)
--write-json-every <t>   Write json output every t seconds (default 1)
--json-location-accuracy <n>  Accuracy of receiver location in json metadata: 0=no location, 1=approximate, 2=exact
--dcfilter               Apply a 1Hz DC filter to input data (requires more CPU)
--help                   Show this help

Debug mode flags: d = Log frames decoded with errors
                  D = Log frames decoded with zero errors
                  c = Log frames with bad CRC
                  C = Log frames with good CRC
                  p = Log frames with bad preamble
                  n = Log network debugging info
                  j = Log frames to frames.js, loadable by debug.html
```
