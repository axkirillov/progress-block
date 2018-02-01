// define the progress block class

class ProgressRing {
  constructor(){

    //select the svg circle element
    this.circle = document.querySelector('.progress-block__ring');
    
    // get the radius value from the svg element
    this.radius = this.circle.r.baseVal.value;

    // calculate circle circumference
    this.circumference = this.radius * 2 * Math.PI;

    // making the stroke dashed and setting the length of a dash equal to circumference
    this.circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
    this.circle.style.strokeDashoffset = this.circumference;

    // getting the block element (for the hide function)
    this.block = document.querySelector('.progress-block');
  }

  //Sets the progress value
  //Takes in the percentage value and calculates an offset based on that
  setValue (percent) {
    const offset = this.circumference - percent / 100 * this.circumference;
    this.circle.style.strokeDashoffset = offset;
    return "value set to " + percent;
  }

  // Sets the animation mode based on two string parameters
  setMod (animated, yes) {
    if (animated === "animated" && yes === "yes"){
      this.circle.style.animation = 'spin 2s linear infinite';
      return "animation on";
    } else if (animated === "animated" && yes === ""){
      this.circle.style.animation = 'none';
      return "animation off";
    } else {
      return "incorrect arguments, try ('animated', 'yes') or ('animated', '')";
    }
  }

  // Sets the hidden mode, takes in a boolean
  hide(boolean) {
    if (boolean === true){
      this.block.style.display = 'none';
      return "hidden"
    } else {
      this.block.style.display = 'initial';
    }
  }

}

// create progress block instance
const progress = new ProgressRing;

// get progress value from default "Value" input
const input = document.querySelector('.controls__progress-value');
progress.setValue(input.value);

// listen to "Value" input
input.addEventListener('change', function(e) {
  if (input.value < 101 && input.value > -1) {
    progress.setValue(input.value);
  }  
})

// listen to "Animate" toggle switch
const toggleAnimate = document.querySelector('.controls__switch--animate');
toggleAnimate.addEventListener('change', function(e) {
  if(this.checked) {
    progress.setMod("animated", "yes");
  } else {
    progress.setMod("animated", ""); 
  } 
})

// listen to "Hide" toggle switch
const toggleHide = document.querySelector('.controls__switch--hide');
toggleHide.addEventListener('change', function(e) {
  if(this.checked) {
    progress.hide(true);
  } else {
    progress.hide(false);
  } 
})

// Prevent saving the toggle switch state on reload
const inputs = document.getElementsByTagName("input");
for (var i in inputs)
    if (inputs[i].type=="checkbox") inputs[i].checked=false;