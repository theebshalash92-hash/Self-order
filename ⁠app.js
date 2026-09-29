// بيانات الأصناف (أكثر من 15 صنفاً مقسمة حسب الفئات)
const categories = [
    {
        title: "2. قاعدة السلطة الأساسية",
        items: [
            { id: "b1", name: "خس آيسبرغ طازج" },
            { id: "b2", name: "جرجير بلدي" },
            { id: "b3", name: "سبانخ بيبي" },
            { id: "b4", name: "كينوا مسلوقة" }
        ]
    },
    {
        title: "3. البروتينات الصحية",
        items: [
            { id: "p1", name: "دجاج مشوي ترياكي" },
            { id: "p2", name: "تونة صافي" },
            { id: "p3", name: "حمص مسلوق" },
            { id: "p4", name: "جبن فِتا مكعبات" },
            { id: "p5", name: "بيض مسلوق" }
        ]
    },
    {
        title: "4. الخضار والإضافات الملونة",
        items: [
            { id: "t1", name: "طماطم كرزية" },
            { id: "t2", name: "خيار مقطع" },
            { id: "t3", name: "ذرة حلوة" },
            { id: "t4", name: "فلفل رومي ملون" },
            { id: "t5", name: "زيتون أسود شرائح" },
            { id: "t6", name: "جزر مبشور" }
        ]
    },
    {
        title: "5. المقرمشات والبذور",
        items: [
            { id: "c1", name: "خبز محمص بالأعشاب" },
            { id: "c2", name: "جوز أمريكي مقرمش" },
            { id: "c3", name: "بذور دوار الشمس" }
        ]
    },
    {
        title: "6. الصوصات اللذيذة",
        items: [
            { id: "s1", name: "صوص سيزار" },
            { id: "s2", name: "ليمون وزيت زيتون أصلي" },
            { id: "s3", name: "عسل وخردل" },
            { id: "s4", name: "صوص رانش" }
        ]
    }
];

// بناء العناصر ديناميكياً في الصفحة
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("ingredients-container");

    categories.forEach(cat => {
        let sectionHTML = `
            <section class="section-card">
                <h2>${cat.title}</h2>
                <div class="items-grid">
        `;

        cat.items.forEach(item => {
            sectionHTML += `
                <label class="item-checkbox">
                    <input type="checkbox" name="ingredient" value="${item.name}" onchange="updateTotal()">
                    <span>${item.name}</span>
                </label>
            `;
        });

        sectionHTML += `</div></section>`;
        container.innerHTML += sectionHTML;
    });

    // تفاعل اختيار الحجم
    const sizeCards = document.querySelectorAll(".size-card");
    sizeCards.forEach(card => {
        card.addEventListener("click", () => {
            sizeCards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");
            card.querySelector("input").checked = true;
            updateTotal();
        });
    });

    updateTotal();
});

// حساب السعر الإجمالي
function updateTotal() {
    const selectedSize = document.querySelector('input[name="saladSize"]:checked');
    let basePrice = selectedSize ? parseFloat(selectedSize.dataset.price) : 3.5;
    
    // يمكنك إضافة رسوم إضافية إذا زاد عدد الإضافات عن حد معين مستقبلاً
    document.getElementById("totalPrice").textContent = basePrice.toFixed(2);
}

// إرسال الطلب عبر واتساب
function sendOrderWhatsApp() {
    const selectedSize = document.querySelector('input[name="saladSize"]:checked').value;
    const checkedItems = Array.from(document.querySelectorAll('input[name="ingredient"]:checked')).map(el => el.value);
    const notes = document.getElementById("orderNotes").value;
    const totalPrice = document.getElementById("totalPrice").textContent;

    if (checkedItems.length === 0) {
        alert("الرجاء اختيار بعض المكونات لسلطتك أولاً!");
        return;
    }

    let message = `*طلب سلطة جديد 🥗*%0A`;
    message += `------------------%0A`;
    message += `*الحجم:* ${selectedSize}%0A`;
    message += `*المكونات المختارة:*%0A`;
    checkedItems.forEach((item, index) => {
        message += `• ${item}%0A`;
    });
    
    if (notes.trim() !== "") {
        message += `*ملاحظات:* ${notes}%0A`;
    }
    
    message += `------------------%0A`;
    message += `*المجموع الإجمالي:* ${totalPrice} دينار`;

    // استبدل الرقم أدناه برقم الواتساب الخاص بالمحل (مع رمز الدولة بدون علامة +)
    const phoneNumber = "962790000000"; 
    
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
}
