---
title: QTableWidget基础使用方法
description: 介绍QTableWidget基础使用方法：设置行列、设置表头、合并单元格、动态插入、控件等等.
date: 2025-03-05
image: /frontend/cpp.png
minRead: 6
author:
  name: 石头
  avatar:
    src: /avatar.svg
    alt: 石头
---
# QTableWidget
 1. 官方定义：QTableWidget类提供了一个具有默认模型的基于项目的表视图
 2. 设置行列：
 ```html
 <div>123</div>
 ```
```cpp
QTableWidget *ptableWidget = new QTableWidget();
ptableWidget->setColumnCount(4);
ptableWidget->setRowCount(4);

#include <iostream>
using namespace std;
int main() {
cout << "Hello, World!" << endl;
return 0;
}
```
 3. 设置行距列距：
```cpp
//循环设置
for(int i = 0; i < 4; i++)
{
    ptableWidget->setRowHeight(50, i);
    ptableWidget->setColumnWidth(100, i);
}
//单个设置，设置指定行列的长宽数值
    ptableWidget->setRowHeight(50, 1);
    ptableWidget->setColumnWidth(100, 1);
```
![如图是循环设置好的均匀的表格](https://i-blog.csdnimg.cn/blog_migrate/6f5edaec9a82d9120f361ac141e87bd9.png)
 4. 设置水平表头：
```cpp
 QStringList list;
list << "疾风剑豪" << "齐天大圣" << "德玛西亚" << "熔岩巨兽";
ptableWidget->setHorizontalHeaderLabels(list);
//同理，可设置竖直表头，这里不再赘述
```
 ![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/9802d42f07cf9f2a71e54e70ae21e41a.png)
 
 5. 合并单元格：void QTableView::setSpan(int row, int column, int rowSpanCount, int columnSpanCount)
 官方解释：将表元素(行、列)的跨度设置为由(rowSpanCount, columnSpanCount)指定的行和列数。
 前面两个参数是需要合并的单元格行列位置，后面两个是行列的跨度，比如单元(0, 0)，跨度是(2, 1)
 则效果如下：
```cpp
//竖着两个单元格的合并
 ptableWidget->setSpan(0, 0, 2, 1);
//横着两个单元格的合并
 ptableWidget->setSpan(0, 2, 1, 2);
//可以循环合并或者实时合并，根据自己的要求来，目前没有直接的函数来分割单元格的，需要自己写特定类型的QTableWidget
```
 ![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/9ff768f4cbe0f76bc2a26b1b37c08a52.png)
 
 6. 动态插入数据：
```cpp
    QStringList list3;
    list3 << "斩钢刃" << "真假美猴王" << "正义裁决" << "印度飞饼";
    for(int i = 0; i < ptableWidget->columnCount(); i++)
    {
        //第一行出入数据
        ptableWidget->setItem(0, i, new QTableWidgetItem(list3[i]));
        /*
        *QTableWidgetItem类提供了一个用于QTableWidget类的项,上面确实建立了单元格，但是单元格里面还是空的，
        *需要new 一个项目item才能对其进行输入、读取、设置背景、设置字体等各种style，下面接下来将会分析
    }
```
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/a53d5ccd989e3f01663b78a8e67bf501.png)
 7. 动态插入表格：
```cpp
    int rowCount = ptableWidget->rowCount();// 现有的行数
    ptableWidget->insertRow(rowCount);// 下一行插入
```

 9. 读取单元格内容：
```cpp
    QTableWidgetItem *cellItem = new QTableWidgetItem;
    for(int i = 0; i < ptableWidget->columnCount(); i++)
    {
        cellItem = ptableWidget->item(0, i);
        // 先判断再读取，因为可能有的单元格建立了没有new QTableWidgetItem ，那么里面就是NULL，你去获取一个NULL指向的值肯定会出现断错误
        if(cellItem != NULL)
        {
            qDebug() << cellItem->text();
        }
    }
```
 9. 单元格内颜色，字体修改：
```cpp
 QTableWidgetItem *cellItem = new QTableWidgetItem;
for(int i = 0; i < ptableWidget->columnCount(); i++)
{
   cellItem = ptableWidget->item(0, i); // 对第一行进行样式修改
   cellItem->setForeground(QBrush(QColor(Qt::red))); // 设置前背景，也就是字体颜色
   // cellItem->setTextColor(QColor(Qt::red)); // 次语句也可以设置字体颜色，但是已经被弃用了，以后都用上面的形式即可
   cellItem->setBackground(QBrush(QColor(Qt::green))); // 设置指定单元格背景色，若需要修改整个表格的背景色，可以用stylesheet来设置
   cellItem->setTextAlignment(Qt::AlignCenter); // 设置字体中间对齐
}
```
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/d7e6933e65ed5bd2a3d24ee44cd4935a.png)
 10. 单元格内添加控件：
```cpp
    //(1) 添加单个控件
    QDateEdit *dateItem = new QDateEdit();
    ptableWidget->setCellWidget(0, 0, dateItem);

    //(2) 添加多个控件
    QCheckBox *checkItem = new QCheckBox();
    QComboBox *comboItem = new QComboBox();
 
    comboItem->addItem("第一项");
    
    QHBoxLayout *h = new QHBoxLayout();
    h->addWidget(checkItem);
    h->addWidget(comboItem);

    QWidget *widget = new QWidget();
    widget->setLayout(h);
    ptableWidget->setCellWidget(0, 1, widget);
```
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/acd87d5ee5e873a9c4563db55bf6f11e.png)

 11. 获取单元格内对象，并进行所需操作：
```cpp
    QWidget *getWidget = ptableWidget->cellWidget(0, 0);//获取(0, 0)单元格的控件
    QDateEdit *newDateItem = (QDateEdit*)getWidget; //将对象强转为控件的类型并赋给新new出来的控件，那么单元格内的控件操作就可以用newDateItem来操作了
    //获取单元格控件上的内容
    qDebug() << newDateItem->text();
    //获取单元格控件的信号
    connect(newDateItem, &QDateEdit::dateChanged, this, [=](){ qDebug() << newDateItem->text();});
    //有更多操作,可以自己练习练习
```

 12. 整体样式修改：
```cpp
    ptableWidget->horizontalHeader()->setStyleSheet("QHeaderView::section{background: yellow;}");//设置水平表头背景色，竖直表头亦可
    ptableWidget->setEditTriggers(QTableView::NoEditTriggers); //设置不可编辑
//    ptableWidget->setEditTriggers(QTableView::DoubleClicked); //设置双击编辑，默认单击编辑
    ptableWidget->horizontalHeader()->setStretchLastSection(true); //设置表格最后一列自动与表格边界平齐

    ptableWidget->setStyleSheet("background-color:rgb(121, 121, 121)");
```
 ![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/125d63774e061d2aab9ce10baa92e88e.png)

 13. 清除表格：
 

```cpp
    //清除表格内容
    ptableWidget->clearContents();
    // 清除所有行(或者指定行)
    int rowCount = ptableWidget->rowCount();
    for(int i = rowCount; i > -1; i--)
    {
        ptableWidget->removeRow(i);
    }

    /*
    * 可能会有人像下面这么操作，结果发现没有达到要求，因为删除一行之后,实时获取的RowCount()是变化的，
    * 意思是每次删完一行就会少一行, 到最后for循环里面要删的行数和你想删除的行数不一致
    for(int i = 0; i < ptableWidget->rowCount(); i++)
    {
        ptableWidget->removeRow(i);
    }
    */
```

 14. 其他一些可用项
```cpp
    ptableWidget->verticalHeader()->hide(); //隐藏垂直表头
    ptableWidget->setCornerButtonEnabled(false); //取消左上角一键选中按钮
    ptableWidget->setSortingEnabled(true); //设置单元格按内容排序
    ptableWidget->setGridStyle(Qt::DotLine); //网格线设为 DotLine 类型
    ptableWidget->setShowGrid(true); // 显示网格线
 
```
| 常量 | 值 | 描述
|`:---------:`|`:---------:`|`:---------:`|
| Qt::NoPen | 0 | 无线
| Qt::SolidLine| 1 | 实线
| Qt::DashLine| 2 | 虚线
| Qt::DotLine | 3 | 点线
| Qt::DashDotLine| 4 | 虚点线
| Qt::DashDotDotLine| 5 | 虚点点线
| Qt::CustomDashLine| 6 | 自定义虚线

# QTableView

 1. 官方定义：QTableView类提供了表视图的默认模型/视图实现
 2. 设置列表头：
```cpp
    QStandardItemModel *model = new QStandardItemModel();
    QStringList list;
    list << "频率" << "功率" << "误差";
    model->setHorizontalHeaderLabels(list);
    ui->tableView->setModel(model);
    ui->tableView->horizontalHeader()->setStretchLastSection(true); // 末列对齐
    ui->tableView->show();
```
 3. 插入数据：
```cpp
    QStandardItem *item = NULL;

    for(int i = 0; i < 12; i++)
    {
        for(int j = 0; j < 3; j++)
        {
            item = new QStandardItem(QString::number(j));
            model->setItem(i, j, item);
        }
    }
    ui->tableView->setModel(model);
    ui->tableView->show();
```
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/65893d0798104c1bdf27d8f92164114e.png)

 4. 读取表格数据：
```cpp
    int rowCount = ui->tableView->model()->rowCount(); // 得到行数
    int columnCount = ui->tableView->model()->columnCount(); // 得到列数

    for(int i = 0; i < rowCount; i++)
    {
        for(int j = 0; j < columnCount; j++)
        {
            QModelIndex index = ui->tableView->model()->index(i, j); // 定位数据模型中的数据
            qDebug() << ui->tableView->model()->data(index).toString(); // 打印模型中的数据
        }
    }
```

 5. 显示数据库表格(最常用)：将数据库中某个表内数据显示出来
```cpp
    //如果只有主线程用到数据库，并且数据库连接名是默认的
    QSqlTableModel *model = new QSqlTableModel(this);
    //如果用到了多线程，那么连接名就需要不一样，
    //QSqlTableModel *model = new QSqlTableModel(this, QSqlDatabase database("连接名"));
    
    model->setTable("productor"); // 显示数据库中某个表
    model->select(); // 刷新数据
    
    //所有的更改都将缓存在模型中，直到调用submitAll()或revertAll()为止。
    model->setEditStrategy(QSqlTableModel::OnManualSubmit); 
    ui->tableView->setModel(model);

    // 按条件搜索记录
    QString sql = QString("select * from enterTable where 时间 between '%1' and       '%2'").arg(s_time).arg(e_time);
    model->QSqlQueryModel::setQuery(sql, QSqlDatabase database("连接名"));
    model->select(); // 刷新数据
```
# 初次编辑博客，可能知识有点欠缺，欢迎大家指教
# 下一篇介绍两种表格的导入与导出为Excel表格
