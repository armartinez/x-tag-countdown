# Countdown

The `<x-countdown>` component displays a countdown from the input date to the current date. 

## Usage

```html
<x-countdown date="2016-09-28"></x-countdown>
```

```javascript
var countdown = document.querySelector('x-countdown');
// Sets the countdown date
countdown.date = "2016-09-28"
// Starts the countdown.
countdown.start();
```

## Methods

### `start`

Starts the countdown.

### `stop`

Stops the countdown.

### `update`

Updates the current displayed time.

## Attributes

### `date`

The countdown date.


