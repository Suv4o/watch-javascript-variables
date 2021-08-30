const subscribe = (propertyName, obj) => {
    Object.defineProperty(obj, propertyName, {
        configurable: true,
        get() {
            return obj[`_${propertyName}`];
        },
        set(value) {
            if (value === obj[propertyName]) {
                return;
            }
            const oldValue = obj[propertyName];
            obj[`_${propertyName}`] = value;
            obj[
                "watch" + propertyName[0].toUpperCase() + propertyName.slice(1)
            ]((newVal = value), (oldVal = oldValue));
        },
    });
};

const unsubscribe = (propertyName, obj) => {
    Object.defineProperty(obj, propertyName, {
        get() {},
        set() {},
    });
};

this.watchName = (newValue, oldValue) => {
    console.log("New: ", newValue, "Old: ", oldValue);
};

subscribe("name", this);
this.name = "Aleks";
this.name = "Nicole";
this.name = "Nicole";
this.name = "April";
unsubscribe("name", this);
this.name = "Tom";
this.name = "Mark";
this.name = "Bob";
subscribe("name", this);
this.name = "Chris";
