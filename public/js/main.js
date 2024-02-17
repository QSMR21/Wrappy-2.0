import { navigateToFormStep} from './form.js'
import { init, animate, setcolor } from './three.js';



init();
animate();


/**
 * 
 * Listeners
 * 
 */


  //Navigation Multi step form
  document.querySelectorAll(".navigate").forEach((formNavigationBtn) => {
    formNavigationBtn.addEventListener("click", () => {
      const stepNumber = parseInt(formNavigationBtn.getAttribute("step_number"));
      navigateToFormStep(stepNumber);
    });
  });

  //Fetch hexa color in the form
  document.querySelectorAll('input[name="enveloppe_color"]').forEach(radioButton => {
      radioButton.addEventListener('change', () => {
          document.getElementById('selectedColor').value = radioButton.getAttribute('color');
      });
  });
  //Color choice button 
  const btn_color = document.querySelectorAll('.btn.color');
  for (const i of btn_color) {
    i.addEventListener('click', () => { setcolor(i.getAttribute("color")) });
  }

