// Storage Controller

//Item Controller
const ItemCtrl = (function () {

  const Item = function (id, name, callories) {
    this.id = id;
    this.name = name;
    this.callories = callories;
  }
  const data = {
    items: [],
    currentItem: null,
    totalCalories: 0
  }
  return {
    addtoData: function (item) {
      if (data.items.length < 0) {
        let id = 0
      }
      else {
        id = parseInt(data.items.length + 1)
      }

      let preItem = new Item(id, item.name, item.callories);
      data.currentItem = preItem;
      data.items.push(preItem);
    },
    getData: function () {
      return data.items;
    },
    getCurr: function () {
      return data.currentItem;
    },
    getTcal: function () {
      data.totalCalories = 0;
      data.items.forEach(function (item) {
        data.totalCalories += parseInt(item.callories);
      })
      return data.totalCalories;
    },
    getCurI: function () {
      return data.currentItem;
    },
    editItem: function (id) {
      data.items.forEach(function (item, index) {
        if (item.id == id) {
          data.currentItem = data.items[index];

        }
      })
    },
    delItem: function () {
      data.items.splice(data.currentItem.id - 1, 1);

    },
    deleteItems: function(){
      data.items = [];
      data.currentItem = null;
    },
    editSubmitItem: function (item) {
      data.currentItem.name = item.name;
      data.currentItem.callories = item.callories;
      data.items[data.currentItem.id - 1] = data.currentItem;
      data.totalCalories

    },
  }
})();

//UI Controller


const UICtrl = (function () {
  const UISelectors = {
    addBtn: 'addbtn',
    inputName: 'item-name',
    inputCal: 'item-calories',
    htmlUL: 'item-list',
    delmeal: 'delmeal',
    editmeal: 'editmeal',
    totalCal: '.total-calories',
    ul: 'item-list',
    clearBTN: 'clear-all'
  };
  return {
    getSelectors: function () {
      return UISelectors;
    },
    getValues: function () {
      return {
        name: document.getElementById(UISelectors.inputName).value,
        callories: document.getElementById(UISelectors.inputCal).value
      }
    },
    refreshUi: function () {
      let totalC = ItemCtrl.getTcal();

      document.querySelector(UISelectors.totalCal).innerHTML = totalC;
      let itemtobeAdded = ItemCtrl.getData();
      let prepHtml = '';
      itemtobeAdded.forEach(function (item) {
        prepHtml += `<li class="collection-item" id="item-${item.id}">
       <strong>${item.name}: </strong> <em>${item.callories} Calories</em>
       <a href="#" class="secondary-content">
         <i class="edit-item fa fa-pencil"></i>
       </a>
     </li>`;
        let ul = document.getElementById(UISelectors.htmlUL).innerHTML = prepHtml;
      })
    },
    delItem: function () {
      let remove = document.getElementById(`item-${ItemCtrl.getCurr().id}`).remove();
    },
    alertUi: function () {
      alert('Empty fields')
    },
    clearFields: function () {
      document.getElementById(UISelectors.inputName).value = '';
      document.getElementById(UISelectors.inputCal).value = '';
    },
    updateInFileds: function (id) {
      document.getElementById(UISelectors.inputName).value = ItemCtrl.getCurI().name;
      document.getElementById(UISelectors.inputCal).value = ItemCtrl.getCurI().callories;
      document.getElementById(`item-${id}`).classList.add('red');
    },
    updateTotal: function () {
      let totalC = ItemCtrl.getTcal();
      document.querySelector(UISelectors.totalCal).innerHTML = totalC;
    },
    cleanUI: function(){
      let ul = document.getElementById(UISelectors.htmlUL).innerHTML = '';
    }


  }
})()


//App

const App = (function () {

  const loadEventListeners = function () {
    document.getElementById(UICtrl.getSelectors().clearBTN).addEventListener('click', clearALL);
    document.getElementById(UICtrl.getSelectors().addBtn).addEventListener('click', itemAddSubmit);
    document.getElementById(UICtrl.getSelectors().delmeal).addEventListener('click', delItem);
    document.getElementById(UICtrl.getSelectors().editmeal).addEventListener('click', editStateSubmit);
    document.getElementById(UICtrl.getSelectors().ul).addEventListener('click', function (e) {
      if (e.target.classList.contains('edit-item')) {
        let ul = e.target.parentNode.parentNode.id;
        let id = ul.split('-')
        editState(id[1]);
      }
    })
  }
  //Add Item to List
  const itemAddSubmit = function (e) {
    let item = UICtrl.getValues();
    if (item.name !== '' && item.callories !== '') {
      ItemCtrl.addtoData(item);
      UICtrl.refreshUi();
      UICtrl.clearFields();
    } else {
      UICtrl.alertUi();
    }
    e.preventDefault();
  };

  //Edit state
  const editState = function (id) {
    document.getElementById(UICtrl.getSelectors().addBtn).classList.add('hide');
    document.getElementById(UICtrl.getSelectors().delmeal).classList.remove('hide');
    document.getElementById(UICtrl.getSelectors().editmeal).classList.remove('hide');
    ItemCtrl.editItem(id);
    UICtrl.updateInFileds(id);
  }
  //Edit Submit
  const editStateSubmit = function (e) {
    let item = UICtrl.getValues();
    if (item.name !== '' && item.callories !== '') {
      ItemCtrl.editSubmitItem(item);
      UICtrl.refreshUi();
      UICtrl.clearFields();
      defaultState();
    } else {
      UICtrl.alertUi();
    }
    e.preventDefault();
  }

  //Delete Item
  const delItem = function () {

    ItemCtrl.delItem();
    UICtrl.delItem();
    UICtrl.clearFields();
    UICtrl.updateTotal();
    defaultState();
    alert('Item Deleted')
  };
  //Delete all Items 
  const clearALL = function(){
    ItemCtrl.deleteItems();
    UICtrl.updateTotal();
    UICtrl.cleanUI();
    defaultState();
  }
  //Default State Remove the edit,delete and back button
  const defaultState = function () {
    document.getElementById(UICtrl.getSelectors().addBtn).classList.remove('hide');
    document.getElementById(UICtrl.getSelectors().delmeal).classList.add('hide');
    document.getElementById(UICtrl.getSelectors().editmeal).classList.add('hide');
  };
  return {
    init: function () {
      loadEventListeners();
      defaultState();
    }
  }

})(ItemCtrl, UICtrl)

App.init();