class ProgressRing {
  constructor(){
    this.circle = document.querySelector('.progress-block__ring');
    this.radius = this.circle.r.baseVal.value;
    this.circumference = this.radius * 2 * Math.PI;
    this.circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
    this.circle.style.strokeDashoffset = this.circumference;
    this.block = document.querySelector('.progress-block');
  }
  setValue (percent) {
    const offset = this.circumference - percent / 100 * this.circumference;
    this.circle.style.strokeDashoffset = offset;
    return "value set to " + percent;
  }
  setMod (animated, yes) {
    if (animated === "animated" && yes === "yes"){
      this.circle.style.animation = 'spin 2s linear infinite';
      console.log("animation on");
    } else if (animated === "animated" && yes === ""){
      this.circle.style.animation = 'none';
      console.log("animation off");
    } else {
      console.log("incorrect arguments, try ('animated', 'yes') or ('animated', '')");
    }
  }
  hide(boolean) {
    if (boolean === true){
      this.block.style.display = 'none';
    } else {
      this.block.style.display = 'initial';
    }
  }

}

const progress = new ProgressRing;

const input = document.querySelector('.controls__progress-value');
progress.setValue(input.value);

input.addEventListener('change', function(e) {
  if (input.value < 101 && input.value > -1) {
    progress.setValue(input.value);
  }  
})

const toggleAnimate = document.querySelector('.controls__switch--animate');


toggleAnimate.addEventListener('change', function(e) {
  if(this.checked) {
    progress.setMod("animated", "yes");
  } else {
    progress.setMod("animated", ""); 
  } 
})

const toggleHide = document.querySelector('.controls__switch--hide');
// const block = document.querySelector('.progress-block');

// function hide() {
//   block.style.display = 'none';
// }

// function show(){
//   block.style.display = 'initial';
// }

toggleHide.addEventListener('change', function(e) {
  if(this.checked) {
    progress.hide(true);
  } else {
    progress.hide(false);
  } 
})